import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';


import "../../css/message.css";


class Message extends Component{
    constructor(props) {
        super(props);
        this.dismissMessage = this.dismissMessage.bind(this);

        var expires = this.props.message.expires

        this.state = {
            expires:expires,
        }

    }

    componentDidMount() {

    }
    dismissMessage(){
        this.props.dismissMessage(this.props.message.id)
    }

    render(){
        let cssClass = "message " +this.props.message.priority;
        let width;
        if(this.state.expires != -1 && this.state.expires > 0){
            setTimeout(()=>{
                var remaining = this.state.expires - 1
                this.setState({expires:remaining})
            }, 100)

            let remaining_time = (this.state.expires / this.props.message.expires) * 100;
            width = {
                width:remaining_time + "%"
            }
        } else if (this.state.expires === 0){
            this.dismissMessage();
        } else {
            width = {
                width:0
            }
        }



        return(
            <div className = {cssClass}>
                <button className="message-left">{this.props.message.from.user_name}:</button>
                <button className="message-middle">{this.props.message.msg}
                    <div className="message-remaining-time" style={width}></div>
                </button>
                <button className="message-right" onClick={this.dismissMessage}><span className = "glyphicon glyphicon-remove"></span></button>

            </div>
        )
    }
}

export default Message;