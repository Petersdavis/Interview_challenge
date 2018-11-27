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
        this.subscribeToCoin = this.subscribeToCoin.bind(this);
        this.unsubscribeToCoin = this.unsubscribeToCoin.bind(this);

        this.state = {
            timestamp: 'no timestamp yet',
            user:{
              user_id:0,
              user_name:"Guest",
            },
            my_coins:[],
            coins:[],
            messages:[],
            api_request_in_progress:false
        };
    }
    componentDidMount(){
        this.getCoins(1,20);
    }

    sendAdminMessage(msg ,timeout){
        var messages = this.state.messages;
        let id = Math.floor(Math.random()*(-10000))
        messages.push(
            {
                from:"ADMIN",
                to:this.state.user.user_name,
                msg: msg,
                expires: timeout,
                priority: "success",
                id:id

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
                            this.sendAdminMessage("Welcome to the Crypt-Toe-Verse! ", -1)

                            subscribeUser(data.id, this.receiveMessage);
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
                            this.setState({subs:data.subs});

                            subscribeUser(data.id, this.receiveMessage);
                            data.subs.forEach(
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
                        if(coin.coin_id == coin_id){
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
                            if(coin.coin_id == coin_id){
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
                if(coin.id == coin_id){
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
        messages.forEach((msg)=>{
            if(msg.id == msg_id){
                msg.expires = 0;

                if(msg.from !== "ADMIN"){
                    API.rmmessage(msg);
                }

            }
        });

        this.setState({messages:messages});
    }

    sendMessage(msg){
        return new Promise((resolve,reject)=>{
            msg.from = this.state.user.user_name;
            msg.expires = 150;
            msg.priority = "";
            API.message(msg).then(
                ()=>{ this.sendAdminMessage("Message Sent", 40);}
            ).catch(
                err=>{
                    this.sendAdminMessage("Error Sending Message", 40);
                }
            );
        });
    }

    getCoins(from, to){
        if(this.state.api_request_in_progress){
            return;
        }

        this.setState({api_request_in_progress:true})

        API.coins(from, to).then(
            coins => {
                var current_coins = this.state.coins
                coins.forEach(coin =>{
                    var exists = false;
                    current_coins.map(
                    (cc) => {
                        if(cc.id == coin.id){
                            cc = Object.assign(cc, coin)
                            exists = true;
                        }
                    })
                    if(!exists){
                        current_coins.push(coin);
                    }
                })
                this.setState({coins:current_coins})
                this.setState({api_request_in_progress:false})

        }).catch(
            (err)=>{
                this.setState({api_request_in_progress:false})
            }

        )
    }

    subscribeToCoin(coin_id){
        if(this.state.api_request_in_progress){
            return;
        }

        this.setState({api_request_in_progress:true})

        API.subscribe(this.state.user.user_id, coin_id).then(
            fresh_coin => {
                var my_coins = this.state.my_coins;
                my_coins.push(fresh_coin);
                this.setState({my_coins:my_coins})
                this.setState({api_request_in_progress:false})


                setTimeout(
                    ()=>{
                        subscribeCoin(coin_id, this.coinUpdate, this.coinSubscriber);
                    }, 100
                )

            }).catch(
            (err)=>{
                this.setState({api_request_in_progress:false})
            }

        )
    }

    unsubscribeToCoin(coin_id){
        if(this.state.api_request_in_progress){
            return;
        }

        this.setState({api_request_in_progress:true})

        API.unsubscribe(this.state.user.user_id, coin_id).then(
            () => {
                var my_coins = this.state.my_coins;
                my_coins = my_coins.filter(
                    (coin)=>{
                        return coin.id !== coin_id;
                    }
                );
                this.setState({my_coins:my_coins})
                this.setState({api_request_in_progress:false})

                setTimeout(
                    ()=>{
                        unsubscribeCoin(coin_id);
                    }, 100
                )

            }).catch(
            (err)=>{
                this.setState({api_request_in_progress:false})
            }
        )
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

          return (
              <Dashboard
                  user = {this.state.user}
                  coins = {this.state.coins}
                  my_coins = {this.state.my_coins}
                  messages = {this.state.messages}

                  subscribe = {this.subscribeToCoin}
                  unsubscribe = {this.unsubscribeToCoin}
                  sendMessage = {this.sendMessage}
                  logout = {this.logout}
                  dismissMessage = {this.dismissMessage}
                  getCoins = {this.getCoins}
              />
          )
        }
    }
}

export default App;