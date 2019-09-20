import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isLoggedIn } from './helpers/helper'

const PrivateRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn(props) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute
