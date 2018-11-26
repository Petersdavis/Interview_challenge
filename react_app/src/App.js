import React, {Component} from 'react';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import { API } from './api';
import {subscribeCoin, unsubscribeCoin, subscribeUser, unsubscribeUser} from './sockets';

import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css';

class App extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
        this.sendAdminMessage = this.sendAdminMessage.bind(this);
        this.signup = this.signup.bind(this);
        this.coinSubscriber = this.coinSubscriber.bind(this);
        this.coinUpdate = this.coinUpdate.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.dismissMessage = this.dismissMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getCoins = this.getCoins.bind(this);

        this.state = {
            timestamp: 'no timestamp yet',
            user:{
              user_id:0,
              user_name:"Guest",
            },
            subscriptions:[],
            my_coins:[],
            coins:[],
            messages:[            ]
        };
    }

    sendAdminMessage(msg){
        var messages = this.state.messages;
        messages.push(
            {
                from:{
                    user_name:"ADMIN",
                    user_id: 0
                },
                msg: msg,
                expires: -1,
                priority: "success"

            }
        )

        this.setState({messages:messages})

    }

    signup(user){
        return new Promise(
            (resolve, reject)=>{
                API.signup(user).then(
                    (res)=>{
                        if(res.status == 200) {
                            var data = res.message;
                            this.setState({user: {user_id: data.id, user_name: data.name}});
                            this.setState({my_coins: []});
                            this.sendAdminMessage("Welcome to the Crypt-Toe-Verse! ")

                            subscribeUser(user.id, this.receiveMessage);
                            resolve();
                        } else {
                            reject(res.message);
                        }
                    }
                )
            }
        )
    }

    login(user){
        return new Promise(
            (resolve, reject)=>{
                API.login(user).then(
                    (res)=>{
                        if(res.status == 200){
                            var data = res.message;
                            this.setState({user:{user_id:data.id, user_name:data.name}});
                            this.setState({messages:data.messages});
                            this.setState({my_coins:data.my_coins});

                            subscribeUser(user.id, this.receiveMessage);
                            user.subs.forEach(
                                (sub)=>{
                                    subscribeCoin(sub, this.coinUpdate, this.coinSubscriber);
                                }
                            )
                            resolve();

                        } else {
                            reject(res.message);
                        }

                    }
                ).catch(
                    (err)=>{
                        console.log(err);

                    }

                )
            }
        )
    }

    coinSubscriber(error, message, coin_id){
        message = message.split(":")
        var my_coins = this.state.my_coins;
        switch (message[0]){
            case "ADD":
                if(my_coins.some(
                    (coin)=>{
                        if(coin.coin_id === coin_id){
                            var new_sub = {id:message[1], name:message[2]}
                            coin.subs.push(message[1])
                            return true;
                        }

                    }
                )){
                    this.setState({my_coins: my_coins})
                } else {
                    console.log("ERROR: COULD NOT FIND COIN SUBSCRIPTION")
                }
                break;

            case "RM":
                if(my_coins.some(
                        (coin)=>{
                            if(coin.coin_id === coin_id){
                                coin.subs = coin.subs.filter(
                                    (sub)=>{
                                        return sub.id !== message[1];
                                    })
                                return true;
                            }

                        }
                )){
                    this.setState({my_coins: my_coins})
                } else {
                    console.log("ERROR: COULD NOT FIND COIN SUBSCRIPTION")
                }
                break;
        }
    }

    coinUpdate(error, message, coin_id){
        var my_coins = this.state.my_coins
        var coin_object = JSON.parse(message);
        if(my_coins.some(
            coin=>{
                if(coin.id === coin_id){
                    coin = Object.assign(coin, coin_object)
                    return true;
                }
            })
        ){
          this.setState({my_coins:my_coins})
        } else {
            console.log("ERROR: COULD NOT FIND COIN")
        }
    }

    logout(){
        /*** TODO: DESTROY DATA ***/
        var user = {
            user_id:0,
            user_name:""
        }

        this.setState({ user: user });
    }

    receiveMessage(error, msg){
        var msg_object = JSON.parse(msg);
        var messages = this.state.messages;
        messages.push(msg_object);
        this.setState({messages:messages});
    }

    dismissMessage(msg_id){
        /**Get UserID & Token Then send dismiss message to API */
        let messages = this.state.messages;

        let message_to_delete = messages.filter(
            (msg)=>{
                return msg.id === msg_id
            }
        );
        console.log(message_to_delete);

        if(message_to_delete.length === 0){
            console.error("COULD NOT FIND MESSAGE");
            return;
        }

        messages = messages.filter(
            (msg)=>{
                return msg.id !== msg_id
            }
        );
        this.setState({messages:messages});
        if(message_to_delete[0].from.user_id !== 0){
            API.rmmessage(message_to_delete[0]);
        }
    }

    sendMessage(msg){

    }

    getCoins(from, to){
        API.coins(from, to).then(
            coins => {
                coins.forEach(coin =>{
                    var current_coins = this.state.coins
                    var exists = false;
                    current_coins = current_coins.map(
                    (cc) => {
                        if(cc.id = coin.id){
                            cc = Object.assign(cc, coin)
                            exists = true;
                        }
                    })
                    if(!exists){
                        current_coins.push(coin);
                    }

                    this.setState({coins:current_coins})
                })
        })
    }

    subscribeToCoin(id){

    }

    unsubscribeToCoin(id){

    }

    render(){

        if(this.state.user.user_id===0){
          return (
              <Login
                login={this.login}
                signup={this.signup}
              />
          )
        } else {
           if(this.state.coins.length === 0){
               this.getCoins(1,20);
           }



          return (
              <Dashboard
                  user = {this.state.user}
                  subscriptions = {this.state.subscriptions}
                  coins = {this.state.coins}
                  messages = {this.state.messages}

                  logout = {this.logout}
                  dismissMessage = {this.dismissMessage}
              />
          )
        }
    }
}

export default App;