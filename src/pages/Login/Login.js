import React, { Component } from 'react'
import  { Redirect, Link } from 'react-router-dom';
import './Login.scss';

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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchToken } from '../../actions/AuthActions';
import { closeNotification, showNotification } from '../../actions/NotificationActions';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { ...props, email: '', password: '' };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let payload={
      "email":this.state.email,
      "password":this.state.password,
    }
    this.props.actions.fetchToken(payload);
  }

  renderRedirect() {
      //TO-DO: require refactoring into a component after saving functionality is finished
      if (this.props.UserStore.authenticated) {
            return (
                <Redirect to="/">
                </Redirect>
            )
       } else {
          return null
      }
  }
  renderTopSection() {
      return (
          <>
            <Typography gutterBottom variant="h1" className="text-center login-title">
                Welcome to Hotel management
            </Typography>
            <div id="login-title-divider"></div>
            <Typography gutterBottom variant="h4" className="text-center login-subtext">
                Login
            </Typography>
            <Typography gutterBottom variant="h4" className="text-center register-subtext">
                If you don't have an account, Please <Link to="/register"> Register </Link>
            </Typography>
          </>
      )
  }
  render() {
    return (
        <main className='main'>
            <CssBaseline />
            <Grid container alignItems="center" justify="center" className="login-container-grid">
                <Grid item xs={6}>
                    <Paper elevation={0} square={true} className='paper'>
                        <form onSubmit={this.handleSubmit} className='form'>
                            {   this.renderTopSection() }
                            <FormControl margin="normal" required className="form-control">
                                <InputLabel htmlFor="email">
                                  Email
                                </InputLabel>
                                <Input id="email" name="email"   value={this.state.email} onChange={this.handleEmailChange} autoComplete="email" autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required className="form-control">
                                <InputLabel htmlFor="password">
                                  Password
                                </InputLabel>
                                <Input name="password"  value={this.state.password} onChange={this.handlePasswordChange} type="password" id="password" autoComplete="current-password" />
                            </FormControl>
                            <Button
                            label="Submit"
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className='submit form-control'
                            >
                                Sign In
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
                fetchToken,
            },
            dispatch
        ),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
