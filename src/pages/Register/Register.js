import React, { Component } from 'react'
import  { Redirect, Link } from 'react-router-dom';
import './Register.scss';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { registerUser } from '../../actions/AuthActions'
import { validateEmail } from '../../helpers/helper';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = { 
      ...props,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {} 
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleConfirmPasswordChange(event) {
    this.setState({confirmPassword: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.handleValidation()) {
      let payload={
        "name":this.state.name,
        "email":this.state.email,
        "password":this.state.password,
      }
      this.props.actions.registerUser(payload);
    }
  }

  handleValidation() {
        let fields = this.state;
        // let room = this.state.room_id;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = 'Name is required.';
        }
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = 'Email is required.';
        }
        if (fields["email"] && !validateEmail(fields["email"])) {
            formIsValid = false;
            errors["email"] = 'Email is invalid.';
        }
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = 'Password is required.';
        }
        if (!fields["confirmPassword"]) {
            formIsValid = false;
            errors["password"] = 'Confirm Password is required.';
        }
        if (fields["confirmPassword"] && fields["password"] && (fields["password"] !== fields["confirmPassword"])) {
            formIsValid = false;
            errors["confirmPassword"] = 'Password do not match.';
        }

        this.setState({errors: errors});
        return formIsValid;
    }

  renderRedirect() {
      if (this.props.UserStore.registerSuccess) {
            return (
                <Redirect to="/login">
                </Redirect>
            )
       } else {
          return null
      }
  }
  renderTopSection() {
      return (
          <>
            <Typography gutterBottom variant="h1" className="text-center register-title">
                Welcome to Hotel management
            </Typography>
            <div id="register-title-divider"></div>
            <Typography gutterBottom variant="h4" className="text-center register-subtext">
                Register
            </Typography>
            <Typography gutterBottom variant="h4" className="text-center register-subtext">
                If you already have an account, Please <Link to="/login"> Login </Link>
            </Typography>
          </>
      )
  }
  render() {
    return (
        <main className='main'>
            <CssBaseline />
            <Grid container alignItems="center" justify="center" className="register-container-grid">
                <Grid item xs={6}>
                    <Paper elevation={0} square={true} className='paper'>
                        <form onSubmit={this.handleSubmit} className='form'>
                            {   this.renderTopSection() }
                            <FormControl margin="normal" required className="form-control">
                                <InputLabel htmlFor="name">
                                  Name
                                </InputLabel>
                                <Input name="name"  value={this.state.name} onChange={this.handleNameChange} type="name" id="name" autoComplete="current-name" />
                                <span className="form-error"><strong>{this.state.errors["name"]}</strong></span>
                            </FormControl>
                            <FormControl margin="normal" required className="form-control">
                                <InputLabel htmlFor="email">
                                  Email
                                </InputLabel>
                                <Input id="email" name="email"   value={this.state.email} onChange={this.handleEmailChange} autoComplete="email" autoFocus />
                                <span className="form-error"><strong>{this.state.errors["email"]}</strong></span>
                            </FormControl>
                            <FormControl margin="normal" required className="form-control">
                                <InputLabel htmlFor="password">
                                  Password
                                </InputLabel>
                                <Input name="password"  value={this.state.password} onChange={this.handlePasswordChange} type="password" id="password" autoComplete="current-password" />
                                <span className="form-error"><strong>{this.state.errors["password"]}</strong></span>
                            </FormControl>
                            <FormControl margin="normal" required className="form-control">
                                <InputLabel htmlFor="confirm-password">
                                  Confirm Password
                                </InputLabel>
                                <Input name="confirm-password"  value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} type="password" id="password" autoComplete="current-password" />
                                <span className="form-error"><strong>{this.state.errors["confirmPassword"]}</strong></span>
                            </FormControl>
                            <Button
                            label="Submit"
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className='submit form-control'
                            >
                                Register
                            </Button>
                            </form>
                        { this.renderRedirect() }
                    </Paper>
                </Grid>
            </Grid>
        </main>
    );
  }
}


function mapStateToProps(state) {
    return {
        UserStore: state.UserStore,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                registerUser,
            },
            dispatch
        ),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)
