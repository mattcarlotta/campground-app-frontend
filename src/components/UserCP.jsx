import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import moment from 'moment';

import * as actions from '../actions/Actions';

class UserCP extends Component{

  onDeleteClick(favoriteId) {
    const userId = localStorage.getItem('userId');
    this.props.deleteFavorite({ userId, favoriteId });
  }

  renderFavorites() {
    if (this.props.favorites.length === 0) {
      return (
        <div>
          <em>Uh oh!</em> You don't have any favorites!
        </div>
      );
    } else {
      return this.props.favorites.map((favorite) => {
        return (
          <div key={favorite.campground._id} className="">
            <div className="row">
              <div className="favorite-container">
                <div className="favorite rounded">
                  <Link to={`/campgrounds/${favorite.campground._id}`} className="button primary styled rounded">
                  {favorite.campground.name} - {favorite.campground.location}
                  </Link>
                  <span>
                    <button className="button alert tiny rounded container margin-left" onClick={this.onDeleteClick.bind(this,favorite._id)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          );
        });
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
        <div className="nav-container">
          <ul className="nav-breadcrumbs">
            <li>
              <Link to="/">Home </Link> <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </li>
            <li>
              <span className="campground-name"> User Control Panel</span>
            </li>
          </ul>
        </div>
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
