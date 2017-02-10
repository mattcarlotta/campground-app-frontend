import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class NotFound extends Component {
  componentDidMount() {
    document.body.classList.add('not-found-image');
  }

  componentWillUnmount() {
    document.body.classList.remove('not-found-image');
  }

  countdownTimer() {
    window.setTimeout(() => {
      browserHistory.goBack();
    }, 1500);
  }

  render() {
    return (
      <span>{this.countdownTimer()}</span>
    );
  }
};


export default NotFound;
