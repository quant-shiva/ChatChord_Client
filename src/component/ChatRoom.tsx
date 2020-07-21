import React, { Component } from 'react'
import { Container, CssBaseline, Button} from '@material-ui/core';
import Auth from '../config/firebaseConfig';

export class ChatRoom extends Component {
    
    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    Hello
                </div>
                <Button variant="contained" color="secondary" onClick={()=>{
                    Auth.signOut()
                    .then(()=>{
                        localStorage.removeItem("_ucr");
                        window.location.href = "/signin";
                    })
                }}>
                    Secondary
                </Button>
            </Container>
        )
    }
}

export default ChatRoom
