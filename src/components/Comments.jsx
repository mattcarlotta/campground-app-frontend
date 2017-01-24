import React, { Component } from 'react';
import { connect } from 'react-redux';


import RenderAlert from '../containers/RenderAlert';
import * as actions from '../actions/Actions';

class Comments extends Component {
  constructor() {
    super();

    this.state = { fakeId: "1" };
  }
  compoentWillMount() {
    const id = this.props.id;
  }
  handleSubmit(e) {
    e.preventDefault();
    const author = this.props.signedinUser;
    const text = this.refs.newComment.value;
    const id = this.props.id;
    let comment = { text, author };
    this.refs.newComment.value = '';
    this.props.addComment({ comment, id });

    let { fakeId } = this.state;
    this.setState({
      fakeId: fakeId + "1"
    });
    console.log(fakeId);
    comment = { _id: fakeId, text, author};
    console.log(comment);
    this.props.comments.push(comment);
    this.renderComments();
    this.forceUpdate();
  }

  onEditClick() {
    console.log(this.refs.commentId.value);
    console.log('Edited');
  }

  onDeleteClick() {
    let comments = this.props.comments;
    const id = this.props.id;
    const commentId = this.refs.commentId.value;
    this.props.deleteComment({ id, commentId });
    for (let i=0; i<comments.length; i++) {
      if (comments[i]._id === commentId) {
        this.props.comments.splice(i, 1);
      }
    }
    this.renderComments();
    this.forceUpdate();
  }


  showAuthorButtons(commentId) {
    if (this.props.authenticated && this.props.signedinUser) {
      return (
        <div>
          <button className="button warning tiny rounded" onClick={this.onEditClick.bind(this)} ref="commentId" value={commentId}>
          Edit
          </button>
          <button className="button alert tiny rounded" onClick={this.onDeleteClick.bind(this)} ref="commentId" value={commentId}>
          Delete
          </button>
        </div>
      );
    }
  }

  renderComments() {
    const { comments } = this.props;

    console.log(comments);

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
            <div className="bold">
              {comment.author}<div className="posted-at">1 minute ago</div>
            </div>
            <li className="user-comment black">{comment.text}</li>
            {this.showAuthorButtons(comment._id)}
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
