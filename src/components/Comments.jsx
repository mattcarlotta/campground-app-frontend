import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import RenderAlert from '../containers/RenderAlert';
import RenderComments from '../containers/RenderComments';
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
      if (this.state.showOrHideComments === "hidden") {this.toggleCommentsClass();}
    } else {
      this.refs.newComment.focus();
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
          <RenderComments comments={this.props.comments} id={this.props.id} />
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
