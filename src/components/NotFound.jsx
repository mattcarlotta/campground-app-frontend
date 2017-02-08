import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class NotFound extends Component {
  componentDidMount() {
    document.body.classList.add('not-found-image');
  }
  componentWillUnmount() {
    document.body.classList.remove('not-found-image');
  }
  render() {
    return (
      <div className="row">
        <div className="container">
          <button onClick={browserHistory.goBack} className="button primary rounded">
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Go Back
          </button>
        </div>
      </div>
    );
  }
};


export default NotFound;
