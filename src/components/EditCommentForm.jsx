import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import moment from 'moment';

import RenderAlert from '../containers/RenderAlert';
import * as actions from '../actions/Actions';

const validate = values => {
  const errors = {}
  if(!values.comment) {
    errors.comment = 'Required';
  } else if (values.comment.length > 2){
    errors.comment = 'Error! Must be 2 characters or more!';
  } else if (values.comment.length > 500){
    errors.comment = 'Error! Must be 500 characters or less!';
  }
  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <div className="error-handlers"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> {error}</div>}
    </div>
  </div>
)

class EditComment extends Component {
  componentDidMount() {
    if (this.props.params.id) {
      const { signedinUser } = this.props;
      this.checkAuthor(signedinUser).then(() => {
          this.handleInitialize();
        }, (err) => {
          this.props.authError('You do have not permission to do that!');
          browserHistory.push('/');
      });
    }
  }

  checkAuthor(signedinUser) {
    const { author:commentAuthor } = this.props;
    return new Promise(function(resolve,reject){
        commentAuthor === signedinUser ? resolve() : reject()
    });
  }

  componentWillUnmount() {
    this.props.authError('');
  }

  handleInitialize() {
    const initData = { "commentText": this.props.commentText }
    this.props.initialize(initData);
  }

  handleFormSubmit(formProps) {
    const { campgroundId, commentId, author } = this.props;
    const text = formProps.commentText;
    const updated = true;
    const updatedAt = moment().unix();
    const comment = { text, updatedAt, updated };
    this.props.editComment({ commentId, comment, campgroundId });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, fields: { commentText }} = this.props;

    return (
      <div className="row padded">
        <div className="small-centered large-4">
          <div className="container form-details rounded">
            <h1 className="title text-center">Edit Comment</h1>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Field name="commentText" type="text" component={renderField} />
              <div>
                <button type="submit" className="button primary rounded expanded" disabled={submitting}>Submit</button>
                <button type="button" className="button alert rounded expanded" disabled={ pristine || submitting } onClick={ reset }>Clear Values</button>
              </div>
            </form>
            <RenderAlert />
          </div>
        </div>
        <div className="index-link">
          <Link onClick={browserHistory.goBack} className="button primary rounded float-left"><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    author: state.comment.author,
    campgroundId: state.comment.campgroundId,
    commentId: state.comment.commentId,
    commentText: state.comment.commentText,
    signedinUser: state.signedinUser.username,
  };
}

EditComment = reduxForm({
  form: 'edit_comment',
  validate,
  fields: ['commentText']
})(EditComment);

export default connect(mapStateToProps, actions)(EditComment);
