//from: https://blog.manifold.co/building-a-chat-room-in-30-minutes-using-redis-socket-io-and-express-9e8e5a578675
"use strict";

import express from "express";
import { client } from "./lib/redis";
import * as helper from "./lib/functions";


const router = express.Router();

export let test = router.all("/test", (req, res) => {
    console.log("request")
    helper.test().then(
        (response)=>{
            res.send({response: response});
        }
    ).catch(
        (err)=>{
            res.send(err);
        }
    )
});

export let login = router.all("/login", (req, res) => {

    let name = req.body.name
    let pwd = req.body.pwd

    helper.userLogin(pwd, name).then(
        (user)=>{
            res.send({
                status:200,
                message:user
            });
        }
    ).catch(
        (err)=>{
            if(err == "USER_DNE"){
                res.send({ status: 403, message: "User does not exist" });
            } else {
                res.send({ status: 500, message: "Redis connection failed: " + err});
            }
        }
    )
});

export let signup = router.post("/signup", (req, res) => {

    let name = req.body.name;
    let pwd = req.body.pwd;

    helper.userSignup(pwd, name).then(
        (user)=>{
            console.log("created user:");
            console.log(user);
            res.send({
                status:200,
                message:user
            });
        }
    ).catch(
        (err)=>{
            if(err =="USER_EXISTS"){
                res.send({ status: 403, message: "USER_EXISTS" });
            } else {
                res.send({ status: 500, message: "Redis connection failed: " + err});


            }

        }
    )
});

export let coins = router.all("/coins", (req, res) => {
    let from = req.body.from_id
    let to = req.body.to_id
    getCoins(from, to).then(
        (coins)=>{
            res.send({
                status:200,
                message:coins
            });
        }
    )
});

export let search = router.all("/search", (req, res) => {
    searchCoin(start, end).then(
        (coins)=>{
            res.send({
                status:200,
                message:coins
            });
        }
    )
});

export let subscribe = router.all("/subscribe", (req, res) => {
    let user_id = req.body.user_id
    let coin_id = req.body.coin_id

    subscribeCoin(user_id, coin_id).then(
        ()=>{
            res.send({
                status:200,
                message:"subscribed"
            });
        }
    )
});

export let unsubscribe = router.all("/unsubscribe", (req, res) => {
    let user_id = req.body.user_id
    let coin_id = req.body.coin_id

    unsubscribeCoin(user, coin_id).then(
        ()=>{
            res.send({
                status:200,
                message:"unsubscribed"
            });
        }
    )
});

export let message = router.all("/message", (req, res) => {
    let message = req.body.message
    saveMessage(message).then(
        (msg)=>{
            res.send({
                status:200,
                message:"message created"
            });
        }
    ).catch(
        (err)=>{
            res.send({ status: 500, message: err});
        }
    )
});

export let rmmessage = router.all("/rmmessage", (req, res) => {
    let message = req.body.message
    deleteMessage(message).then(
        ()=>{
            res.send({
                status:200,
                message:"message deleted"
            });
        }
    )
});

