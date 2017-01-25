import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';

import * as actions from '../actions/Actions';

class UserCP extends Component{

  renderFavorites() {
    if (this.props.favorites.length === 0) {
      return (
        <div>
          <em>Uh oh!</em> You don't have any favorites!
        </div>
      );
    }
  }

  render() {
    const { signedinUser } = this.props;

    if (!signedinUser) {
      return (
        <div className="row">
          <div className="columns medium-6 large-4 small-centered">
            <div className="content text-center">
              <h3><i className="fa fa-cog fa-spin"></i>Loading...</h3>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="text-center">
          <div className="row">
            <div className="small-centered large-12">
              <div className="jumbotron rounded text-left">
                <div className="inset">
                  <h1>Welcome {signedinUser}!</h1>
                  <p> You've been a member since {moment.unix(this.props.joinedAt).format('MMM Do, YYYY')}!</p>
                  {this.renderFavorites()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    signedinUser: state.signedinUser.username,
    joinedAt: state.signedinUser.joinedAt,
    favorites: state.signedinUser.favorites
  };
}

export default connect(mapStateToProps, actions)(UserCP);
