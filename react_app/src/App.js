import React, {Component} from 'react';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css';

class App extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
        this.dismissMessage = this.dismissMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.state = {
            user:{
              user_id:1,
              user_name:"Peter",
            },
            subscriptions:[],
            coins:[],
            messages:[
                {
                    from:{
                        user_name:"ADMIN",
                        user_id: 0
                    },
                    msg: "Welcome to the Crypt-Toe-Verse!",
                    expires: -1,
                    priority: "success"
                }
            ]
        };

    }

    login(username, password){
        return new Promise(
            (resolve, reject)=>{
                reject({msg:"Hello World"});
            }
        )

        /*
        var  user = {
            user_id:1,
            user_name:"Peter"
        }

        this.setState({ user: user});

        */
    }

    logout(){
        /*** TODO: DESTROY DATA ***/
        var user = {
            user_id:0,
            user_name:""
        }

        this.setState({ user: user });

    }

    dismissMessage(msg_id){
        /**Get UserID & Token Then send dismiss message to API */
        let messages = this.state.messages;
        let id;
        messages = messages.filter(
            (msg)=>{
                return msg.id !== msg_id
            }
        );

        this.setState({messages:messages});
    }

    sendMessage(msg){

    }


    render(){
        if(this.state.user.user_id===0){
          return (
              <Login
                login={this.login}
              />
          )
        } else {
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