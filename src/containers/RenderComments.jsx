import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import moment from 'moment';

import * as actions from '../actions/Actions';

class RenderComments extends Component {
  onDeleteClick(commentId) {
    const campgroundId = this.props.id;
    this.props.deleteComment({ campgroundId, commentId });
  }

  onEditClick(commentId, commentText, author) {
    const campgroundId = this.props.id;
    const comment = { campgroundId, commentId, commentText, author };
    this.props.setCommentText(comment)
    browserHistory.push(`/campgrounds/${campgroundId}/comment/edit/${commentId}`);
  }

  showAuthorButtons(commentId, commentText, author) {
    if (this.props.authenticated && this.props.signedinUser && this.props.signedinUser === author) {
      return (
        <div>
          <button className="button warning tiny rounded" onClick={this.onEditClick.bind(this,commentId, commentText, author)}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button className="button alert tiny rounded margin-left" onClick={this.onDeleteClick.bind(this,commentId)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      );
    }
  }

  showAuthorStamp(commentAuthor) {
    if (commentAuthor === this.props.campground.author) {
      return (
        <span>
          <span className="campground-author rounded">{commentAuthor} <i className="fa fa-check-circle-o" aria-hidden="true"></i></span>
        </span>
      );
    } else {
      return (
        <span>
          <span>{commentAuthor}</span>
        </span>
      );
    }
  }

  showCommentStamp(updated, updatedAt, postedAt) {
    let showUpdatedTimestamp = '';
    if (updated) {
         showUpdatedTimestamp = <span className="updated-icon rounded">Updated: {moment.unix(updatedAt).format('MMM Do YYYY @ h:mm a')}</span>;
    }
      return (
      <span>
        {moment.unix(postedAt).format('MMM Do YYYY @ h:mm a')} {showUpdatedTimestamp}
      </span>
    );
  }

  renderComments() {
    const { comments, commentText } = this.props;

    if (comments.length === 0) {
      return (
        <div className="marginalize">
          <p>Be the first to leave a comment!</p>
        </div>
      );
    } else {
      return comments.map((comment) => {
        return (
          <div key={comment._id} className="comment-box">
            <div className="row">
              <div className="columns medium-2 avatar-padding">
                <img src="/assets/images/male-avatar.png" className="avatar" />
              </div>
              <div className="semi-bold">
                {this.showAuthorStamp(comment.author)}
                <div className="posted-at">
                  {this.showCommentStamp(comment.updated, comment.updatedAt, comment.postedAt)}
                </div>
              </div>
              <li className="user-comment black">
                {comment.text}
              </li>
              {this.showAuthorButtons(comment._id, comment.text, comment.author)}
            </div>
          </div>
        )
      });
    }
  }

  render() {
    return (
      <div className="padded">
        {this.renderComments()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    campground: state.campground,
    editCommentModalState: state.editCommentModalState,
    signedinUser: state.signedinUser.username,
  };
}

export default connect(mapStateToProps, actions)(RenderComments);
