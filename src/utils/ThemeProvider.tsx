import React, { Component } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette:{
        type:"dark",
        primary:{
            light: '#757ce8',
            main: '#00acc1',
            dark: '#00acc1',
            contrastText: '#fff'
        },
    }
})


export class ThemeProviderComponent extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                {this.props.children}
            </ThemeProvider>
        )
    }
}

export default ThemeProviderComponent
