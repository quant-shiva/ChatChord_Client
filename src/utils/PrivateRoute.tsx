import React, { Component } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import AuthContext from './AuthContext';

export class PrivateRoute extends Component<RouteProps> {

    static contextType = AuthContext;

    render() {
        let auth = this.context.isVerified;
        return (
            auth ? 
            <Route 
            path={this.props.path}
            exact={this.props.exact}
            component={this.props.component}
            />
            : <Route 
            path={this.props.path}
            exact={this.props.exact}
            >
                <Redirect to="/signin"/>
            </Route>
        )
    }
}

export default PrivateRoute;
