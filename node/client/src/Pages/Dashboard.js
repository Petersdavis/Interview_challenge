import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import SearchBar from '../Components/SearchBar'
import ListView from '../Components/ListView'
import ChatBox from '../Components/ChatBox'
import Coin from '../Components/Coin'
import Action from '../Components/Action';



import "../css/dashboard.css";

import Background from '../Assets/bitcoin_background_2.jpg';

class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.setMessageTarget = this.setMessageTarget.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            search_term:"",
            messageTarget: "ADMIN"
        }

    }

    componentDidMount() {
        document.title = "Welcome to the Crypt-Toe-Verse";
    }

    handleScroll(e){
        let x = e.target;
        let height = x.getBoundingClientRect().height;
        let scrollTop = x.scrollTop;
        let scrollHeight = x.scrollHeight;


        let last_coin = this.props.coins[this.props.coins.length-1].id

        if(scrollTop+height+700 > scrollHeight){
            this.props.getCoins(last_coin+1, last_coin+30);
        }

        console.log(e)
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
        var normal_coins = []

        var subscribed_coins = []
        let coins = this.props.coins
        let my_coins = this.props.my_coins

        if(this.state.search_term !== ""){
            coins = coins.filter(
                coin=>{
                    return coin.name.toLowerCase().indexOf(this.state.search_term.toLowerCase()) !== -1
                }
            )
            my_coins = my_coins.filter(
                coin=>{
                    return coin.name.toLowerCase().indexOf(this.state.search_term.toLowerCase()) !== -1
                }
            )

            if (coins.length < 10 ){
                setTimeout(
                    ()=>{
                        let last_coin = this.props.coins[this.props.coins.length-1].id
                        this.props.getCoins(last_coin, last_coin+50);
                    }, 1000
                )

            }
        }

        coins.forEach(
            coin=>{

                let action = Array(
                    <Action
                        coin={coin}
                        is_subbed = {false}
                        search_term = {this.state.search_term}
                        unsubscribe = {()=>{return false}}
                        setMessageTarget = {()=>{return false}}
                        subscribe = {this.props.subscribe}
                    />
                )

                normal_coins.push(
                    <Col xs={12} md = {4}>
                        <Coin
                            action = {action}
                            coin = {coin}
                        />
                    </Col>
                )
            }
        )

       my_coins.forEach(
            coin=>{

                let action = Array(
                    <Action
                        coin={coin}
                        is_subbed = {true}
                        subscribe = {()=>{return false}}
                        setMessageTarget = {this.setMessageTarget}
                        unsubscribe = {this.props.unsubscribe}
                        />
                );

                subscribed_coins.push(
                    <Col xs={12} md = {4}>
                        <Coin
                            action = {action}
                            coin = {coin}
                        />
                    </Col>
                )
            }
        )

        let dashboard_background = {
            backgroundImage: `url(${Background})`
        }

        return(
            <div className = "dashboard" style={dashboard_background}>
                <SearchBar
                    setSearch = {this.setSearch}
                    logout = {this.props.logout}
                />
                <div onScroll={this.handleScroll} className="coin-container">
                    <h1 className = "list-header">
                        {this.props.user.user_name}'s Coins
                    </h1>
                    <ListView>
                        {subscribed_coins}
                    </ListView>
                    <h1 className = "list-header">
                        Available Coins
                    </h1>
                    <ListView>
                        {normal_coins}
                    </ListView>
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