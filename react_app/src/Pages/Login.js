import React, {Component} from 'react';
import {Modal, Row, Col, Button, FormControl, Alert} from 'react-bootstrap';



import Background from '../Assets/bitcoin_background.jpg';


import '../css/login.css';



class Login extends Component{
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.dispatchRegistration = this.dispatchRegistration.bind(this);
        this.googleAuth = this.googleAuth.bind(this);
        this.usernameChanged = this.usernameChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.newUsernameChanged = this.newUsernameChanged.bind(this);
        this.newPasswordChanged = this.newPasswordChanged.bind(this);
        this.openRegistration = this.openRegistration.bind(this);
        this.handleClose = this.handleClose.bind(this);


        this.state = {
            registration_active:false,
            registration_error:"",
            login_error:"",
            username:"",
            password:"",
            new_username:"",
            new_password:"",
            new_password_verify:""
        }
    }

    componentDidMount() {
        document.title = "Login to the Crypt-Toe-Verse";
    }

    login(){
        this.setState({login_error:""});

        var username = this.state.username;
        var password = this.state.password;
        this.props.login(username, password).catch(
            (error)=>{
                this.setState({login_error:error.msg});
            }
        )
    }

    dispatchRegistration(){
        this.setState({registration_error:""});

        var username = this.state.new_username;
        var password = this.state.new_password

        this.setState({new_password:"", new_username:"", registration_active:false})
        this.props.dispatchRegistration(username, password).catch(
            (error)=>{
                this.setState({registration_error:error.msg});
            }
        )
    }

    googleAuth(){
        /**
         * Code to get id from google.
         */
        var IdToken = ""
        this.props.storeGoogleIdToken(IdToken);
    }

    usernameChanged(e){
        this.setState({ username: e.target.value });
    }

    passwordChanged(e){
        this.setState({ password: e.target.value });
    }

    newUsernameChanged(e){
        this.setState({ new_username: e.target.value });
    }

    newPasswordChanged(e){
        this.setState({ new_password: e.target.value });
    }

    openRegistration(){
        this.setState({registration_active:true})
    }

    handleClose() {
        this.setState({registration_error:"", new_password:"", new_username:"", registration_active:false})
        this.setState({ registration_active: false });
    }


    render(){

        let login_background = {
            backgroundImage: `url(${Background})`
        }

        let login_error_message = [];
        if(this.state.login_error !== ""){
            login_error_message = <Button bsStyle="danger">{this.state.login_error}</Button>
        }

        let register_error_message = [];
        if(this.state.registration_error !== ""){
            register_error_message = <Button bsStyle="danger">{this.state.registration_error}</Button>
        }


        return(
            <div className = "login" style={login_background}>
                <Modal show={this.state.registration_active} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Account Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            type="text"
                            value={this.state.new_username}
                            placeholder="User ID"
                            onChange={this.newUsernameChanged}
                        />

                        <FormControl
                            type="password"
                            value={this.state.new_password}
                            placeholder="Password"
                            onChange={this.newPasswordChanged}
                        />

                        {register_error_message}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick = {this.dispatchRegistration} className = "btn btn-primary">Submit</Button>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <div className = "login-form-container" >
                    <input
                        type="text"
                        value={this.state.username}
                        placeholder="User ID"
                        onChange={this.usernameChanged}
                    />

                    <input
                        type="password"
                        value={this.state.password}
                        placeholder="*******************"
                        onChange={this.passwordChanged}
                    />

                    {login_error_message}

                    <button onClick={this.login}> Submit </button>
                    <button onClick={this.openRegistration}> New User </button>


                </div>



            </div>
        )
    }
}

export default Login;