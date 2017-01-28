import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import moment from 'moment';

import RenderAlert from '../containers/RenderAlert';
import RenderComments from '../containers/RenderComments';
import * as actions from '../actions/Actions';

const unfavorite = "custom-button button-background-red button-font-white circle fa fa-heart-o cursor";

const favorite = "custom-button button-font-white button-background-red circle fa fa-heart cursor";

class Favorites extends Component {
  onMouseEnterHandler() {
    ReactDOM.findDOMNode(this.refs.icon).className = `${favorite}`;
  }

  onMouseLeaveHandler() {
    ReactDOM.findDOMNode(this.refs.icon).className = `${unfavorite}`;
  }

  onClickHandler(e) {
    e.preventDefault();
    console.log('triggered');
    ReactDOM.findDOMNode(this.refs.icon).className = `${favorite}`;
  }

  favoriteCampground() {
    return (
      <span>
        <button className={unfavorite} aria-hidden="true"
          onMouseEnter={this.onMouseEnterHandler.bind(this)}
          onMouseLeave={this.onMouseLeaveHandler.bind(this)}
          onClick={this.onClickHandler.bind(this)} ref="icon">
        </button>
      </span>
    );
  }

  render() {
    const { comments } = this.props;

    return (
      <span className="favorites-container">
        {this.favoriteCampground()}
      </span>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    campground: state.campground.campground,
    favorites: state.signedinUser.favorites,
    signedinUser: state.signedinUser.username
  };
}

export default connect(mapStateToProps, actions)(Favorites);
