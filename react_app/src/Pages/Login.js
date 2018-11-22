import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Page from './Page';


import Intro from "../assets/About/intro.jpg";

import '../css/About.css';



class About extends Page{
    constructor(props) {
        super(props);
        this.goToHomePage = this.goToHomePage.bind(this);

    }

    componentDidMount() {
        document.title = "About | Vetradent™";
    }

    goToHomePage(){
        this.props.setPage("home")
    }

    render(){

        return(
            <div className = "about">
                <div style={{backgroundImage:"url("+Intro+")"}} className= "intro-chunk">
                    <div className="breadcrumbs"><a aria-label="home page" onClick={this.goToHomePage} className="breadcrumb-home">Home</a><div className="breadcrumb-page">About</div></div>

                    <Row>
                        <Col xs={6}>
                            <h1>{this.contentParser("headline")}</h1>
                            <p>{this.contentParser("headline-text")}</p>
                        </Col>

                    </Row>

                </div>
                <div className="chunk-grey">
                    <h2>{this.contentParser("dechra-headline")}</h2>
                    <p>{this.contentParser("dechra-text")}</p>

                    <h2>{this.contentParser("history-headline")}</h2>
                    <p>{this.contentParser("history-text")}</p>

                    <a href={this.contentParser("visit-dechra-url")} className="action-item">{this.contentParser("visit-dechra")}</a>

                </div>

            </div>
        )




    }
}

export default About;