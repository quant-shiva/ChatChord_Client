import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import routes from '../utils/routes';
import IRoute from '../types/Route';
import PrivateRoute from '../utils/PrivateRoute';

export class Main extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/signin"/>
                            </Route>
                            {
                                routes.map((val:IRoute, i:number)=>{
                                    if(!val.isProtected)
                                    return(
                                        <Route exact path={val.route} component={val.component} key={i}/>
                                    )
                                    else return(
                                        <PrivateRoute exact path={val.route} component={val.component} key={i}/>
                                    )
                                })
                            }
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Main;

