import React, { Component, createContext } from 'react';
import http from './HttpClient';

export const AuthContext = createContext<State>({
    isTokenFound: false,
    token: null,
    isVerifying: false,
    isVerified: false,
    onSignIn: Function
});

interface Props {};

interface State {
    isTokenFound: boolean,
    token: string | null,
    isVerifying: boolean,
    isVerified: boolean,
    onSignIn: Function
};

export class AuthContextProvider extends Component<Props, State> {

    constructor(props: Props){
        super(props);

        const token = localStorage.getItem("_ucr");

        this.state = {
            isTokenFound: token ? true : false,
            token: token,
            isVerifying: token ? true : false,
            isVerified: false,
            onSignIn: this.onSignIn
        }

        this.onSignIn = this.onSignIn.bind(this);

    }

    componentDidMount(){
        
        if(this.state.isTokenFound){
                http.post('/auth',{
                    token: this.state.token
                })
                .then(val=>{
                    if(val.status === 200){
                        this.setState({isVerifying: false, isVerified: true})
                    }
                })
                .catch(err=>{
                    this.setState({isVerifying: false, isVerified: false, token: null},()=>{
                        localStorage.removeItem("_ucr");
                    })
                })
        }
    }

    onSignIn(){
        this.setState({token: localStorage.getItem("_ucr"), isVerified: true})
    }

    render() {
        return (
            <AuthContext.Provider value={{ ...this.state, onSignIn: this.onSignIn}}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContext;