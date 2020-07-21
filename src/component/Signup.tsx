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
import { User } from 'firebase/app';
import Alert from '@material-ui/lab/Alert';
import Auth from '../config/firebaseConfig';

interface Props {};
interface State {
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    agreeTOTerms:boolean,
    submited:boolean,
    submitError:boolean,
    submitMsg:string
};

export default class SignUp extends React.Component<Props, State> {

    constructor(props:Props){
        super(props);

        this.state = {
            firstName: "",
            lastName:"",
            email:"",
            password:"",
            submited:false,
            agreeTOTerms:false,
            submitError:false,
            submitMsg:""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e: FormEvent){
        e.preventDefault();
        this.setState({submitError:false, submited:false},()=>{
            Auth.createUserWithEmailAndPassword(
                this.state.email, this.state.password
            ).then(() => { 
                console.log("Successful") 
                const user: User|null = Auth.currentUser;
    
                if(user){
                    user.sendEmailVerification().then(()=> {
                        this.setState({submited:true, submitMsg:"You are registered successfully, please verify your email."})
                      }).catch((error) => {
                        console.log(error);
                      });
                }
            })
            .catch(err => {
                console.log(err);
                let errorCode = err.code;
    
                switch (errorCode) {
                    case "auth/email-already-in-use":
                        this.setState({submitError:true, submitMsg:"Email already registered, try with another Email."})
                        break;
                    case "auth/invalid-email":
                        this.setState({submitError:true, submitMsg:"Email not valid, try with another Email."})
                        break;
                        case "auth/weak-password":
                        this.setState({submitError:true, submitMsg:"Weak password, try with strong password."})
                    break;
                default:
                    this.setState({submitError:true, submitMsg:"Unable to signup."})
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
                        Sign up
            </Typography>
                    <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={this.state.firstName}
                                    onChange={e=>this.setState({firstName:e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    value={this.state.lastName}
                                    onChange={e=>this.setState({lastName:e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={e=>this.setState({email:e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
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
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" onClick={()=>this.setState({agreeTOTerms:!this.state.agreeTOTerms})}/>}
                                    label="I agree to the terms and conditions."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!this.state.agreeTOTerms || this.state.firstName === "" || this.state.lastName === "" || this.state.password === "" || this.state.email === ""}
                        >
                            Sign Up
              </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                  </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}