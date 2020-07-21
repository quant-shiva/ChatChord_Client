import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CssBaseline, Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexDirection:'column',
      marginTop:'18%',
      marginLeft:'43%'
    },
  }),
);

export default function Loder() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
        <CssBaseline />
            <CircularProgress size={80} thickness={4.0}/>
            <h2>Loading...</h2>
    </Container>
  );
}