import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class Action extends Component{
    constructor(props) {
        super(props);
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.setMessageTarget = this.setMessageTarget.bind(this);
        this.showSubscribers = this.showSubscribers.bind(this);
        this.hideSubscribers = this.hideSubscribers.bind(this);

        this.state = {
            messageTarget:"",
            show_subscribers:false
        }
    }

    subscribe(){

       this.props.subscribe(this.props.coin.id);
    }

    unsubscribe(){
        this.props.unsubscribe(this.props.coin.id);
    }

    setMessageTarget(e){
        this.setState({show_subscribers:false})
        this.props.setMessageTarget(e.target.getAttribute('data-sub'))
    }

    showSubscribers(e){
        this.setState({show_subscribers:true})

    }
    hideSubscribers(e){
        this.setState({show_subscribers:false})
    }

    componentDidMount() {
    }

    render(){
        if(this.props.is_subbed){
           var subscribers = []
           if(this.state.show_subscribers){
               var key = 0
               subscribers.push(
                   <div key = {key++} className = "subscriber-header">
                       Message:
                       <div className = "coin-header-actions">
                           <span onClick={this.hideSubscribers} > X </span>
                       </div>
                   </div>
               )
               this.props.coin.subs.forEach(
                   (sub)=>{
                       if(sub!==null) {
                           subscribers.push(
                               <button key={key++} data-sub={sub} onClick={this.setMessageTarget}>{sub} </button>
                           )
                       }
                   }
               );
           }

           return(
                <div>
                    <div className="subscribers-popup" >{subscribers}</div>
                    <span onClick={this.showSubscribers} className="glyphicon glyphicon-user"> </span>
                    <span onClick={this.unsubscribe} className="glyphicon glyphicon-trash"> </span>
                </div>
           )
        } else {
            return(
            <span onClick={this.subscribe} title={"Subscribe To Coin"} className="glyphicon glyphicon-eye-open">
            </span>
            )
        }


    }
}

export default Action;