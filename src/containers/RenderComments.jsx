import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { IndexLink, Link, browserHistory } from 'react-router';
import moment from 'moment';

import SigninForm from '../components/auth/Signin';
import EditComment from '../containers/EditComment';
import * as actions from '../actions/Actions';

class RenderComments extends Component {
  onDeleteClick(commentId) {
    const id = this.props.id;
    this.props.deleteComment({ id, commentId });
  }

  showAuthorButtons(commentId, commentText, author) {
    if (this.props.authenticated && this.props.signedinUser && this.props.signedinUser === author) {
      return (
        <div>
          <button onClick={this.props.editCommentModal} className="button warning tiny rounded" ref="commentId" value={commentId}>
            Edit
          </button>
          <Modal
            isOpen={this.props.editCommentModalState}
            onRequestClose={this.props.editCommentModal}
            className="modal-content signin-modal-size rounded title"
            overlayClassName="modal-overlay"
            contentLabel="Edit Comment Modal"
          >
            <EditComment id={this.props.id} author={author} commentId={commentId} commentText={commentText} />
            <p onClick={this.props.editCommentModal} className="text-center cursor">close</p>
          </Modal>
          <button className="button alert tiny rounded margin-left" onClick={this.onDeleteClick.bind(this,commentId)} ref="commentId" value={commentId}>
          Delete
          </button>
        </div>
      );
    }
  }

  showCommentStamp(updated, updatedAt, postedAt) {
    if (updated) {
      return (
        <span>
         <span>{moment.unix(updatedAt).format('MMM Do YYYY @ h:mm a')}</span> <span className="updated-icon">*Updated*</span>
        </span>
      );
    } else {
      return (
      <span>
        {moment.unix(postedAt).format('MMM Do YYYY @ h:mm a')}
      </span>
    );
    }
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
              <div className="bold">
                {comment.author}
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
    campground: state.campground.campground,
    editCommentModalState: state.editCommentModalState,
    signedinUser: state.signedinUser.username,
  };
}

export default connect(mapStateToProps, actions)(RenderComments);
