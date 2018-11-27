import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';


import "../../css/message.css";


class NewMessage extends Component{
    constructor(props) {
        super(props);
        this.handleChange= this.handleChange.bind(this);
        this.sendMessage= this.sendMessage.bind(this);


        this.state = {
            msg:""
        }

    }

    componentDidMount() {

    }

    handleChange(e){
        this.setState({msg:e.target.value})
    }

    sendMessage(){
        var msg = {msg:this.state.msg, to:this.props.messageTarget}
        this.props.sendMessage(msg)
    }
    render(){
        return(
            <div className = "message">
                <button className="message-left">{this.props.messageTarget}:</button>
                <input type="text"
                       className="message-middle"
                       placeholder="Send A Message"
                       value = {this.state.msg}
                       onChange = {this.handleChange}
                />
                <button className="message-right" onClick={this.sendMessage}><span className = "glyphicon glyphicon-send"></span></button>

            </div>
        )
    }
}

export default NewMessage;