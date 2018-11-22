import React, {Component} from 'react';
import Content from './Content';
import PageRoutes from './components/PageRoutes'
import './css/App.css';


class App extends Component {
    constructor(props){
        super(props);
        var content = new Content();

        this.state = {
            user:{
              user_id:0,
              user_name:"",
              messages:[
                  {
                    from:"Peter Davis",
                    msg: "Welcome to the Crypt-Toe-Verse!",
                    expires: false,
                    read: false,
                    cssClass: "success"
                  }
              ]
            },
            coins:coins,
        };


        this.setCountry = this.setCountry.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
        this.setPage = this.setPage.bind(this);


    }

    setCountry(country){
        var settings = this.state.settings;
        var page = this.state.page;
        var query_string;
        var host;

        if (country === "US"){
            host = window.location.protocol + "//www.vetradent.com";
        } else if (country === "CA"){
            host = window.location.protocol + "//www.vetradent.ca";
        }

        if(settings.country !== country){
            query_string = host + "/?page=" +page +"&lang=en&country="+country;
            window.location = query_string;
        }

    }

    setLanguage(language){
        var settings = this.state.settings;
        var page = this.state.page;
        var query_string;

        if(settings.language !== language){
            settings.language = language;
            this.setState({settings});
            query_string = window.location.origin + "?page=" +page +"&lang="+settings.language + "&country="+settings.country;
            window.history.pushState({}, "Vetradent by Dechra", query_string);
        }
    }

    getQueryString() {


    }




    render(){
        var page;
        if(this.state.user_id==0){
          return (
              <Login/>
          )
        } else {
          return (
              <Dashboard/>
          )
        }


    }
}

export default App;