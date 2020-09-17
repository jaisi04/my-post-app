import React from 'react';
import axios from 'axios';
import LoginComponent from './Login';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            btnDisabled: false,
        };
        this.updateField = this.updateField.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    updateField(e){
        e.preventDefault();
        const { target: { name, value }} = e;
        name === 'username' ? this.setState({username: value}) : this.setState({password: value});
    }

    loginUser(){
        const { username, password } = this.state;
        this.setState({btnDisabled: true});
        axios.post(`http://localhost:8080/authenticate`, { username, password })
        .then(res => {
            this.setState({btnDisabled: false});
            this.props.toggleUser(res.data.jwt);
        }).catch(err => {
            this.setState({password: '', btnDisabled: false, error: 'Something went wrong'});
        })
    }

    render() {
        return <LoginComponent updateField={this.updateField} {...this.state} loginUser={this.loginUser} />
    }
}

export default Login;
