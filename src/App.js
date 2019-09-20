import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'

// components
import { Header, NotificationSnackbar } from './components';
import Navigation from './Navigation';
import { withRouter } from 'react-router-dom';
import { isLoggedIn } from './helpers/helper';

import './App.scss';

//material-ui
import Grid from '@material-ui/core/Grid';

class App extends Component {

    componentDidMount() {
        if (isLoggedIn()) {

        }
    }

   renderSnackbar() {
      const { open, type, message, messageId } = this.props.NotificationStore;
      let displayMessage = messageId !== "" ? <FormattedMessage id={messageId} description="text" /> : message;
      return (
        <NotificationSnackbar
            open={open}
            variant={type}
            message={displayMessage}
        />
      )
    }

  render() {
    return (
        <div className={(isLoggedIn() ? "" : "logout-user " )+ "App"}>
            <Header history={this.props.history}/>
            <div className="main-container">
                <Grid container spacing={0} justify="center" alignItems="center" className="main-container-grid">
                    <Grid item xs={12} sm={12} md={8} lg={8} className="main-container-grid">
                        <Grid container alignItems="center" justify="center" className="main-container-grid">
                            <Navigation/>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            { this.renderSnackbar() }
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    NotificationStore: state.NotificationStore
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {

      },
      dispatch
    )
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
