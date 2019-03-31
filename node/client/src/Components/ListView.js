import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';


class ListView extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentDidMount() {
    }

    render(){

        return(
            <div className = "list-view">
                <Row>
                    {this.props.children}
                </Row>
            </div>
        )

    }
}

export default ListView;