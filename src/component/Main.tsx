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
import AuthContext from '../utils/AuthContext';
import Loder from '../utils/LoderComponent';


export class Main extends Component {
    static contextType = AuthContext;
    render() {
        return (
            <div>{
                this.context.isVerifying ? <Loder/> :
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/">
                                {
                                    this.context.isVerified ? <Redirect to="/chat"/> : <Redirect to="/signin"/>
                                }
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
                </Router>}
            </div>
        )
    }
}

export default Main;

