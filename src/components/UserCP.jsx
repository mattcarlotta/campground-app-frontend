import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
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
    } else {
      console.log(this.props.favorites);
      // return favorites.map((favorite) => {
      //   return (
      //     <div key={favorite.campground._id} className="">
      //       <div className="row">
      //         <Link to={`/campgrounds/${favorite.campground._id}` className="button primary expanded styled rounded">{favorite.campground._id} - {location}</Link>
      //       </div>
      //     </div>
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
            <div className="columns medium-2 avatar-lg-padding">
              <img src="/assets/images/male-avatar.png" className="avatar-lg" />
            </div>
            <div className="control-panel rounded text-left">
              <div className="control-panel-title">
                <h3>Welcome, {signedinUser}!</h3>
                <p> You've been a member since {moment.unix(this.props.joinedAt).format('MMM Do, YYYY')}!</p>
              </div>
            </div>
            <div className="columns medium-4 text-center float-left">
              <div className="container favorite-details rounded">
                <h3>Favorites</h3>
                <hr />
                {this.renderFavorites()}
              </div>
            </div>
          </div>
        </div>
        <div className="index-link">
          <button onClick={browserHistory.goBack} className="button primary rounded float-left"><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
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
