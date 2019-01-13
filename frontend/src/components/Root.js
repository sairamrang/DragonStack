import React, { Component } from 'react';
import Home from './Home';
import AuthForm from './AuthForm';
import { connect } from 'react-redux';

class Root extends Component{

    render (){
        return (
            this.props.account.loggedIn ? <Home /> : <AuthForm />
        );
    }
}

export default connect (
    ({ account }) => ({ account }), null)
    (Root);