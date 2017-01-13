import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as actions from '../../actions/Actions';

class Signout extends Component {
  componentWillMount() {
    this.setState({ count: 1 });
    this.props.signoutUser();
  }

  componentDidMount() {
    this.countdownTimer();
  }

  countdownTimer() {
    this.timer = setInterval(() => {
      let newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });

      if (newCount === 0) {
        clearInterval(this.timer)
        this.timer = undefined;
        browserHistory.push('/');
      }
    }, 1000);
  }

  render() {
    const { count } = this.state;

    return (
      <div className="row">
        <div className="columns medium-6 large-6 small-centered">
          <div className="text-center">
            <h1 className="page-title"> </h1>
          </div>
          <div className="container__header rounded text-center">
            <h1 className="message">Come Back Soon!</h1>
            <h6>Redirecting in... </h6>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Signout);
