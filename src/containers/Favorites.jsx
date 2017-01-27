import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import moment from 'moment';

import RenderAlert from '../containers/RenderAlert';
import RenderComments from '../containers/RenderComments';
import * as actions from '../actions/Actions';

class Favorites extends Component {
  constructor() {
    super();

    this.state = ({ favoriteClass: 'fa fa-heart-o' })
  }
  onMouseEnterHandler() {
    ReactDOM.findDOMNode(this.refs.icon).className = "custom-button rounded button-dark fa fa-heart golden-icon cursor";
  }

  onMouseLeaveHandler() {
    ReactDOM.findDOMNode(this.refs.icon).className = "custom-button rounded button-blue white-font fa fa-heart cursor";
  }

  onClickHandler(e) {
    e.preventDefault();
    console.log('triggered');
    ReactDOM.findDOMNode(this.refs.icon).className = "custom-button rounded button-dark fa fa-heart golden-icon cursor";
  }

  favoriteCampground() {
    return (
      <span>
        <button className="custom-button rounded button-blue white-font fa fa-heart-o cursor" aria-hidden="true"
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
      <div className="favorites-container">
        {this.favoriteCampground()}
      </div>
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
