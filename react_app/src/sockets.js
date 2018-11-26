import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8080');

function subscribeCoin(coin_id, cb) {
    let message = {action:"subscribe", id:coin_id};
    socket.on('coin.'+coin_id, timestamp=> cb(null, timestamp))
    socket.send(JSON.stringify(message));
}

function unsubscribeCoin(coin_id, cb) {
    let message = {action:"unsubscribe", id:coin_id};
    socket.send(JSON.stringify(message));
}

function login(user_id, cb) {
    let message = {action:"login", id:user_id};
    socket.on('user.'+user_id, message=> cb(null, message))
    socket.send(JSON.stringify(message));
}

function logout(user_id, cb) {
    let message = {action:"logout", id:user_id};
    socket.send(JSON.stringify(message));
}




export {subscribeCoin, unsubscribeCoin, login, logout}