import React, {Component} from 'react';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

import './css/bootstrap.min.css';
import './css/bootstrap-theme.min.css';




class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:{
              user_id:0,
              user_name:"",
            },
            subscriptions:[],
            coins:[],
            messages:[
                {
                    from:"Peter Davis",
                    msg: "Welcome to the Crypt-Toe-Verse!",
                    expires: false,
                    read: false,
                    cssClass: "success"
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
        var user = {
            user_id:0,
            user_name:""
        }

        this.setState({ user: user });

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
                  logout = {this.logout}


              />
          )
        }

    }
}

export default App;