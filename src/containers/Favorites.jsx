import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import moment from 'moment';

import RenderAlert from '../containers/RenderAlert';
import RenderComments from '../containers/RenderComments';
import * as actions from '../actions/Actions';

const unfavorite = "favorites-button favorites-background-transparent favorites-button-font-red circle fa fa-heart-o cursor";

const favorite = "favorites-button favorites-button-font-red favorites-button-background-transparent circle fa fa-heart cursor";

const favorited = "favorites-button favorites-button-font-red favorites-button-background-transparent circle fa fa-heart";

class Favorites extends Component {
  componentWillMount() {
    const { favorites, id } = this.props;
    if (favorites.length > 0) {
      for(let i = 0; i < favorites.length; i++) {
        if(favorites[i].campground._id === id) {
          this.state = { favorited: 'true' }
        break;
       }
        this.state = { favorited: null }
      }
    } else {
      this.state = { favorited: null }
    }
  }

  onMouseEnterHandler() {
    ReactDOM.findDOMNode(this.refs.icon).className = `${favorite}`;
  }

  onMouseLeaveHandler() {
    ReactDOM.findDOMNode(this.refs.icon).className = `${unfavorite}`;
  }

  onClickHandler(e) {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const { _id:campgroundId } = this.props.campground;
    this.props.addFavorite({ userId, campgroundId });
    // ReactDOM.findDOMNode(this.refs.icon).className = `${favorite}`;
  }

  favoriteCampground() {
    const { favorited } = this.state;

    if(favorited) {
      return (
        <span>
          <i className="favorites-button favorites-button-font-red favorites-button-background-transparent circle fa fa-heart" aria-hidden="true">
          </i>
        </span>
      );
    } else if (!favorited) {
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
 }

  render() {
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
