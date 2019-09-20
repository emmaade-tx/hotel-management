import React, { Component } from 'react';
import './Loading.scss';
//material-ui
import CircularProgress from '@material-ui/core/CircularProgress';

class Loading extends Component {
  render() {
    return (
        <div className='loading-icon-container'>
            <CircularProgress className='loading-icon' color='secondary' />
        </div>
    );
  }
}

export default Loading;
