import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import Message from "./Chatbox/Message";
import NewMessage from "./ChatBox/NewMessage";


class ChatBox extends Component{
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    componentDidMount() {
    }

    render(){
        let messages = [];
        let seen_msg = {}
        var key = 0;
        this.props.messages.forEach((msg)=>{
            if(seen_msg[msg.id] === undefined){
                messages.push(
                    <Message key={++key} message={msg} dismissMessage = {this.props.dismissMessage} />
                )
                seen_msg[msg.id] = true;
            }


        })

        return(
            <div className = "chat-box">
                {messages}
                <NewMessage
                    messageTarget = {this.props.messageTarget}
                    sendMessage={this.props.sendMessage}
                />

            </div>
        )

    }
}

export default ChatBox;