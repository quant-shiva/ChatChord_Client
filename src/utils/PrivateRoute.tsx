import React, { Component } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import NotFound from '../component/NotFound';

export class PrivateRoute extends Component<RouteProps> {
    render() {
        let auth = localStorage.getItem("isAuthenticated");
        console.log(auth);
        return (
            <Route 
            path={this.props.path}
            exact={this.props.exact}
            component={auth === "true" ? this.props.component : NotFound}
            />
        )
    }
}

export default PrivateRoute;
