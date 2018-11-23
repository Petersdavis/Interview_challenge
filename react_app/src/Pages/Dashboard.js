import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import SearchBar from '../Components/SearchBar'
import ListView from '../Components/ListView'
import ChatBox from '../Components/ChatBox'



import "../css/dashboard.css";

import Background from '../Assets/bitcoin_background_2.jpg';

class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.setMessageTarget = this.setMessageTarget.bind(this);

        this.state = {
            search_term:"",
            messageTarget:{
                user_id:0,
                user_name: "ADMIN"
            }
        }

    }

    componentDidMount() {
        document.title = "Welcome to the Crypt-Toe-Verse";
    }

    logout(){
        this.props.logout()
    }

    setSearch(search){
        this.setState({search_term:search })

    }

    setMessageTarget(user){
        this.setState({messageTarget:user})

    }


    render(){

        let dashboard_background = {
            backgroundImage: `url(${Background})`
        }

        let subscribed_coins = [];
        let unsubscribed_coins = [];

        this.props.coins.forEach(
            (coin)=>{
                this.props.subscriptions.some(
                    (sub)=>{
                        return sub.coin_id === coin.id
                    }
                ) ? subscribed_coins.push(coin) : unsubscribed_coins.push(coin)
            }
        )


        return(
            <div className = "dashboard" style={dashboard_background}>
                <SearchBar
                    setSearch = {this.setSearch}
                    logout = {this.props.logout}
                />
                <div className="coin-container">
                    <h1 className = "list-header">
                        {this.props.user.user_name}'s Coins
                    </h1>
                    <ListView
                        subscriptions = {this.props.subscriptions}
                        coins = {subscribed_coins}
                        subscribers = {this.props.subscribers}
                        search_term = {this.state.search_term}

                        unsubscribe = {this.props.unsubscribe}
                        setMessageTarget = {this.setMessageTarget}
                    />
                    <h1 className = "list-header">
                        Available Coins
                    </h1>
                    <ListView
                        coins = {unsubscribed_coins}
                        search_term = {this.state.search_term}

                        subscribe = {this.props.subscribe}

                        setMessageTarget = {this.setMessageTarget}
                    />
                </div>

                <ChatBox
                    messages = {this.props.messages}
                    messageTarget = {this.state.messageTarget}

                    sendMessage = {this.props.sendMessage}
                    dismissMessage = {this.props.dismissMessage}
                />
            </div>
        )

    }
}

export default Dashboard;