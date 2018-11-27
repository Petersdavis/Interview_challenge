
"use strict";

import express from "express";
import path from "path";
import env from "node-env-file";
import { client } from "./lib/redis";
import * as routes from "./routes.js";
var bodyParser = require('body-parser')

const app = express();
var http = require('http').Server(app);
// Middleware to parse request body

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//app.use(multer());


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
app.post("/signup", routes.signup);
app.all("/coins", routes.coins);
app.all("/message", routes.message);
app.all("/rmmessage", routes.rmmessage);
app.all("/test", routes.test);


client().then(
    redis => {
        io.on('connection', (socket) => {
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
        });
    }).catch(
    (err)=>{
        console.log(err);
    }
);


io.listen(8080);
http.listen(80);

console.log("listening on 80 and 8080")
