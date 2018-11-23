import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';


import "../../css/message.css";


class NewMessage extends Component{
    constructor(props) {
        super(props);
        this.handleChange= this.handleChange.bind(this);


        this.state = {
            msg:""
        }

    }

    componentDidMount() {

    }

    handleChange(e){
        this.setState({msg:e.target.value})

    }
    render(){
        return(
            <div className = "message">
                <button className="message-left">{this.props.messageTarget.user_name}:</button>
                <input type="text"
                       className="message-middle"
                       placeholder="Send A Message"
                       value = {this.state.msg}
                       onChange = {this.handleChange}
                />
                <button className="message-right" onClick={this.dismissMessage}><span className = "glyphicon glyphicon-send"></span></button>

            </div>
        )
    }
}

export default NewMessage;