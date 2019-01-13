import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, FormControl, FormGroup } from 'react-bootstrap';
import { signUp, logIn } from '../actions/account';
import fetchStates from '../reducers/fetchStates';

let clicked = false;
class AuthForm extends Component{
    
    state = { username : '', password : ''};
    updateUsername = event =>{
        this.setState ({ username: event.target.value });
    }
    updatePassword = event =>{
        this.setState ({ password: event.target.value });
    }
    
    signUp = () => {
        clicked = true;
        const { username, password } = this.state;
        this.props.signUp ({ username, password });
    }
    logIn = () => {
        clicked = true;
        const { username, password } = this.state;
        this.props.logIn ({ username, password });
    }

    get Error() {
        if (this.props.account.status === fetchStates.error && clicked){
            return (
                <div> {this.props.account.message} </div>
            );
        }
    }

    render (){
        return (
            <div>
                <h2>Dragon stack 2</h2>
                <FormGroup>
                    <FormControl 
                    type='text' 
                    value={this.state.username} 
                    placeholder='username' 
                    onChange={this.updateUsername} 
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl 
                    type='password' 
                    value={this.state.password} 
                    placeholder='password' 
                    onChange={this.updatePassword} 
                    />
                </FormGroup>
                <div>
                    <Button onClick={this.logIn}> Log in </Button>
                    <span> or </span>
                    <Button onClick={this.signUp}> Sign up </Button>
                </div>
                <br />
                {this.Error}
            </div>

        );
    }
}

export default connect(
        ({ account }) => ({ account }), 
        { signUp, logIn }
    ) (AuthForm);