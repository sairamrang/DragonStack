import React, { Component } from 'react';
import Generation from './Generation';
import Dragon from './Dragon';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logOut } from '../actions/account';

class Home extends Component{

    render (){
        return (
                <div>
                    <Button onClick={this.props.logOut} className = 'logout-button' >Log out </Button>
                    <h2>Dragon stack</h2>
                    <Generation />
                    <br /><br />
                    <Dragon />
                </div>
        );
    }
}

export default connect(null, { logOut })(Home);
