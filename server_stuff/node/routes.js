//from: https://blog.manifold.co/building-a-chat-room-in-30-minutes-using-redis-socket-io-and-express-9e8e5a578675
"use strict";

import express from "express";
import { client } from "./lib/redis";
import * as helper from "./lib/functions";

const router = express.Router();


export let test = router.all("/test", (req, res) => {
   res.send({hello:"world"})
});

export let login = router.all("/login", (req, res) => {
    userLogin(pwd, user_name).then(
        (user)=>{
            res.send({
                status:200,
                message:user
            });
        }
    ).catch(
        (err)=>{
            res.send({ status: 403, message: "User does not exist" });
        }
    )
});

export let signup = router.all("/signup", (req, res) => {
    userSignup(pwd, user_name).then(
        (user)=>{
            res.send({
                status:200,
                message:user
            });
        }
    ).catch(
        (err)=>{
            res.send({ status: 403, message: "User already exist" });
        }
    )
});

export let coins = router.all("/coins", (req, res) => {
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
    let socket =
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
    let socket = req.io.
    subscribeCoin(user, coin_id).then(
        ()=>{
            res.send({
                status:200,
                message:"subscribed"
            });
        }
    )
});

export let unsubscribe = router.all("/unsubscribe", (req, res) => {
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

