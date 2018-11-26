import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8080');

function subscribeCoin(coin_id, cb, cbsubs) {
    let message = {action:"subscribe", id:coin_id};
    socket.on('coin.'+coin_id, message=> cb(null, message, coin_id))
    socket.on('coin.'+coin_id +".subs", message => cbsubs(null, message, coin_id))
    socket.send(JSON.stringify(message));
}

function unsubscribeCoin(coin_id){
    let message = {action:"unsubscribe", id:coin_id};
    socket.send(JSON.stringify(message));
}

function subscribeUser(user_id, cb) {
    let message = {action:"login", id:user_id};
    socket.on('user.'+user_id, message=> cb(null, message))
    socket.send(JSON.stringify(message));
}

function unsubscribeUser(user_id, cb) {
    let message = {action:"logout", id:user_id};
    socket.send(JSON.stringify(message));
}




export {subscribeCoin, unsubscribeCoin, subscribeUser, unsubscribeUser}