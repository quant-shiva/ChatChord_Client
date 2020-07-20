import React, { Component } from 'react'
import { Container, CssBaseline, Avatar, Typography, Grid, TextField, FormControlLabel, Checkbox, Button, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import firebaseApp from '../config/firebaseConfig';
import { User } from 'firebase';

export class ChatRoom extends Component {
    
    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    Hello
                </div>
            </Container>
        )
    }
}

export default ChatRoom
