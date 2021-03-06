
"use strict";

import express from "express";
import path from "path";
import env from "node-env-file";
import { client } from "./lib/redis";
import * as routes from "./routes.js";
var bodyParser = require('body-parser')
require('events').EventEmitter.prototype._maxListeners = 100;

const app = express();
var http = require('http').Server(app);
// Middleware to parse request body

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


var io = require('socket.io')(http);
app.io = io;
app.all('*',function(req,res,next)
{
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin','http://localhost:3000');
    res.set('Access-Control-Allow-Methods','GET,POST');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');

    if ('OPTIONS' == req.method) return res.send(200);

    next();
});


app.all("/subscribe", routes.subscribe);
app.all("/unsubscribe", routes.unsubscribe);
app.all("/search", routes.search);
app.all("/login", routes.login);
app.all("/signup", routes.signup);
app.all("/coins", routes.coins);
app.all("/message", routes.message);
app.all("/rmmessage", routes.rmmessage);
app.all("/test", routes.test);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

var allClients = [];
client().then(
    redis => {
        io.on('connection', (socket) => {
            allClients.push(socket);

            socket.setMaxListeners(300);
            console.log(socket.id)
            socket.on('message', (message)=>{
                    console.log("message"+message);
                    let msg = JSON.parse(message);
                    let channel, user_id;
                    switch(msg.action){
                        case "login":
                            channel = "user."+msg.id;
                            redis.subscribe(channel);
                            redis.on("message", (channel, message)=>{
                                console.log("redis publication:" + message+ " to channel" +channel)
                                socket.emit(channel, message);
                            });
                            break;
                        case "logout":
                            channel = "user."+msg.id;
                            redis.unsubscribe(channel);
                            break;
                        case "subscribe":
                            channel = "coin." + msg.id
                            redis.subscribe(channel);
                            redis.on("message", (channel, message)=>{
                                console.log("redis publication:" + message+ " to channel" +channel)
                                socket.emit(channel, message);
                            })

                            channel = "coin." + msg.id +".subs"
                            redis.subscribe(channel);
                            redis.on("message", (channel, message)=>{
                                console.log("redis publication:" + message+ " to channel" +channel)
                                socket.emit(channel, message);
                            })

                            break;
                        case "unsubscribe":
                            channel = "coin." + msg.id
                            redis.unsubscribe(channel);

                            channel = "coin." + msg.id +".subs"
                            redis.unsubscribe(channel);
                            break;
                    }
            })

            socket.on('disconnect', function() {
                console.log('Got disconnect!');

                var i = allClients.indexOf(socket);
                allClients.splice(i, 1);
            });
        });
    }).catch(
    (err)=>{
        console.log(err);
    }
);


io.listen(8080);
http.listen(80);

console.log("listening on 80 and 8080")
