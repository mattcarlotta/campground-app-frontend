import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ShowAlert from '../containers/ShowAlert';

class Landing extends Component {
  componentDidMount() {
    document.body.classList.add('background-image');
  }
  componentWillUnmount() {
    document.body.classList.remove('background-image');
  }

  render() {
    return (
      <div>
        <div className="row">
          <ShowAlert />
          <div className="columns medium-6 large-4 small-centered">
            <div className="content text-center">
              <h1>Yelp Camp</h1>
              <h4>Where Humans Meet Wilderness</h4>
              <hr />
              <Link to="/campgrounds" className="button primary medium rounded"><i className="fa fa-search" aria-hidden="true"></i> Get Started</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    signinModalState: state.signinModalState,
    signupModalState: state.signupModalState
   };
}

export default connect(mapStateToProps)(Landing);
