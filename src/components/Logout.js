import React from 'react';
import {withRouter} from 'react-router-dom'
import Home from '../components/Home';

class Logout extends React.Component{
    constructor(props){
        super()
    }

    render(){
        // clear localstorage.
        localStorage.clear()
        this.props.history.push('/')
        return <Home />
    }
}

export default withRouter(Logout)