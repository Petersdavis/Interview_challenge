import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import Message from "./ChatBox/Message";
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

        this.props.messages.forEach((msg)=>{
            messages.push(
                <Message message = {msg} dismissMessage = {this.props.dismissMessage} />
            )

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