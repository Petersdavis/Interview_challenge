import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';


import "../css/dashboard.css";


class SearchBar extends Component{
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.setSearch = this.setSearch.bind(this);

        this.state = {
            search:""
        }
    }

    componentDidMount() {
    }


    setSearch(e){
        let search = e.target.value
        this.setState({search:search})
        this.props.setSearch(search)
    }

    logout(){
        this.props.logout();
    }

    render(){
        return(
            <div>
            <div className = "search-bar">

                <button
                    className = "logout-button"
                    onClick = {this.logout}
                    >
                    <span className="glyphicon glyphicon-off"></span>
                </button>
            </div>
                <input
                    className = "search"
                    placeholder="Search For Coins"
                    onChange={this.setSearch}
                    value={this.state.search}
                />

            </div>
        )

    }
}

export default SearchBar;