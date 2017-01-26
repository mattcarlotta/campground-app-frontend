import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import RenderAlert from '../containers/RenderAlert';
import * as actions from '../actions/Actions';

class Comments extends Component {
  constructor(props) {
    super();

    this.state = ({ showOrHideComments: 'hidden'});
  }

  toggleCommentsClass() {
    let commentBoxClass = (this.state.showOrHideComments === "hidden") ? "show" : "hidden";
    this.setState({ showOrHideComments : commentBoxClass });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.refs.newComment.value.length > 0 ) {
      const author = this.props.signedinUser;
      const text = this.refs.newComment.value;
      const postedAt = moment().unix();
      const id = this.props.id;
      let comment = { text, postedAt, author };
      this.refs.newComment.value = '';
      this.props.addComment({ comment, id });
      if (this.state.showOrHideClass === "hidden") this.toggleCommentsClass();
    } else {
      this.refs.newComment.focus();
    }
  }

  onEditClick() {
    console.log(this.refs.commentId.value);
    console.log('Edited');
  }

  onDeleteClick(commentId) {
    const id = this.props.id;
    this.props.deleteComment({ id, commentId });
  }

  showAuthorButtons(commentId) {
    if (this.props.authenticated && this.props.signedinUser) {

      return (
        <div>
          <button className="button warning tiny rounded" onClick={this.onEditClick.bind(this)} ref="commentId" value={commentId}>
          Edit
          </button>
          <button className="button alert tiny rounded margin-left" onClick={this.onDeleteClick.bind(this,commentId)} ref="commentId" value={commentId}>
          Delete
          </button>
        </div>
      );
    }
  }

  renderComments() {
    const { comments } = this.props;
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
                {comment.author} | {comment._id}
                <div className="posted-at">
                  {moment.unix(comment.postedAt).format('MMM Do @ h:mm a')}
                </div>
              </div>
              <li className="user-comment black">{comment.text}</li>
              {this.showAuthorButtons(comment._id)}
            </div>
          </div>
        )
      });
    }
  }

  render() {
    const { comments } = this.props;
    const { showOrHideComments } = this.state;

    return (
      <div className="comments-container padded">
        <p onClick={this.toggleCommentsClass.bind(this)} className="comments-icon"><i className="fa fa-comments-o" aria-hidden="true"></i> Comments ({comments.length})</p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <button className="button button-primary offset-right">Post</button>
          <div className="input">
            <input type="text" className="new-comment-post expand" rows="1" ref="newComment" placeholder="Leave a comment" />
          </div>
        </form>
        <hr />
        <div className={showOrHideComments}>
          {this.renderComments()}
        </div>
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
