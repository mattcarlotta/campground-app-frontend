import React, { Component } from 'react';
import { connect } from 'react-redux';


import RenderAlert from '../containers/RenderAlert';
import * as actions from '../actions/Actions';

class Comments extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const author = this.props.signedinUser;
    const text = this.refs.newComment.value;
    this.refs.newComment.value = '';
    this.props.comments.push({ text, author });
    this.renderComments();
    this.forceUpdate();
  }

  onEditClick() {
    console.log('Edited');
  }

  onDeleteClick() {
    console.log('Deleted');
  }


  showAuthorButtons() {
    if (this.props.authenticated && this.props.signedinUser) {
      return (
        <div className="marginalize">
          <button className="button alert small float-left rounded" onClick={this.onDeleteClick.bind(this)}>
              Delete
            </button>
          <div>
            <button className="button warning small float-left rounded" onClick={this.onEditClick.bind(this)}>
              Edit
            </button>
          </div>
        </div>
      );
    }
  }

  renderComments() {
    const { comments } = this.props;

    if (comments.length === 0) {
      return (
        <div className="row">
          <p>Be the first to leave a comment!</p>
        </div>
      );
    } else {
      return comments.map((comment) => {
        return (
          <div className="marginalize">
            <li>{comment.text}</li>
            <div>{comment.author}</div>
            {this.showAuthorButtons()}
          </div>
        )
      });
    }
  }

  render() {

    return (
      <div className="comments-container padded">
        <p className="comments-icon"><i className="fa fa-comments-o" aria-hidden="true"></i> Comments</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <button className="button button-primary offset-right">Post</button>
          <div className="input">
            <input type="text" className="new-comment-post expand" rows="1" ref="newComment" placeholder="Leave a comment" />
          </div>
        </form>
        <hr />
        {this.renderComments()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    campground: state.campground.campground,
    signedinUser: state.signedinUser.username
  };
}

export default connect(mapStateToProps, actions)(Comments);
