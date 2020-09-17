import React from 'react';
import Login from '../Login';
import Posts from '../Posts';

class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            token: '',
        };
        this.toggleUser = this.toggleUser.bind(this);
    }

    toggleUser(token){
        token ? this.setState({token}) : this.setState({token: ''});
    }

    render() {
        return (
            <div>
                {this.state.token ? <Posts token={this.state.token} toggleUser={this.toggleUser} /> : <Login toggleUser={this.toggleUser}/>}
            </div>
        );
    }
}

export default Router;