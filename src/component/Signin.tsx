import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import firebaseApp from '../config/firebaseConfig';

interface Props { };
interface State {
  classes: Record<"paper" | "avatar" | "form" | "submit" | "container", string>
}

export default class SignIn extends React.Component<Props, State>{

  render(){
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e)=>{
                e.preventDefault();
                firebaseApp.auth().signInWithEmailAndPassword(
                  "shivam9651566755@gmail.com","Shivam123@"
                ).then(cred=>{console.log("Logged In : ",cred)})
                .catch(error=>{
                  let errorCode = error.code;
                  let errorMessage = error.message;
                  if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                  } else {
                    alert(errorMessage);
                  }
                  console.log(error);
                })
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <div onClick={(e)=>{
                  e.preventDefault();
                  console.log(firebaseApp.auth().currentUser);
                }}>
                  Forgot password?
                </div>
                <div onClick={(e)=>{
                  e.preventDefault();
                  firebaseApp.auth().signOut();
                }}>
                  Logout
                </div>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}