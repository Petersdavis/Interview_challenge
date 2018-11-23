import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import "../css/dashboard.css";

class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);

    }

    componentDidMount() {
        document.title = "Welcome to the Crypt-Toe-Verse";
    }

    logout(){
        this.props.logout()
    }

    render(){

        return(
            <div className = "dashboard">
            </div>
        )

    }
}

export default Dashboard;