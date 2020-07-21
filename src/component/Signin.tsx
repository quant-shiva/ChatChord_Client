import React, { FormEvent } from 'react';
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
import Alert from '@material-ui/lab/Alert';
import Auth from '../config/firebaseConfig';
import AuthContext from '../utils/AuthContext';

interface Props { };
interface State {
  email:string,
  password:string,
  remember:boolean,
  submited:boolean,
  submitError:boolean,
  submitMsg:string
};

export default class SignIn extends React.Component<Props, State>{

  static contextType = AuthContext;

  constructor(props:Props){
    super(props);

    this.state = {
      email:"",
      password:"",
      remember:false,
      submitError:false,
      submitMsg:"",
      submited:false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: FormEvent){
    e.preventDefault();
    this.setState({submitError:false, submited:false},()=>{
      Auth.signInWithEmailAndPassword(
        this.state.email,this.state.password
      ).then(async (cred)=>{
        const user = Auth.currentUser;
        if(user?.emailVerified){
        localStorage.setItem("_ucr",await user.getIdToken());
        this.context.onSignIn();
        window.location.href = "/chat";
        }
        else this.setState({submitError:true, submitMsg:"Account not verified, please verify Email."})
      })
      .catch(error=>{
        let errorCode = error.code;
        switch (errorCode) {
          case "auth/user-not-found":
              this.setState({submitError:true, submitMsg:"User not found, try with another Email."})
              break;
          case "auth/invalid-email":
              this.setState({submitError:true, submitMsg:"Email not valid, try with another Email."})
              break;
              case "auth/wrong-password":
              this.setState({submitError:true, submitMsg:"Wrong password, try with correct password."})
          break;
      default:
          this.setState({submitError:true, submitMsg:"Unable to signin."})
          break;
      }
      })
    })
}

  render(){
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {this.state.submited && <Alert severity="success">{this.state.submitMsg}</Alert>}
        {this.state.submitError && <Alert severity="error">{this.state.submitMsg}</Alert>}
        <div>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
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
              value={this.state.email}
              onChange={e=>this.setState({email:e.target.value})}
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
              value={this.state.password}
              onChange={e=>this.setState({password:e.target.value})}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" onClick={()=>this.setState({remember:!this.state.remember})}/>}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={this.state.password === "" || this.state.email === ""}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              <Link href="#" variant="body2">
                  {"Forget password?"}
                </Link>
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