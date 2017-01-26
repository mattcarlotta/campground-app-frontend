import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';

import RenderAlert from './RenderAlert';
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
  componentWillMount() {
    this.handleInitialize();
  }

  componentWillUnmount() {
    this.props.authError('');
  }

  handleInitialize() {
    const initData = {"commentText": this.props.commentText }
    this.props.initialize(initData);
  }

  handleFormSubmit(formProps) {
    const { id, commentId, author } = this.props;
    const text = formProps.commentText;
    const postedAt = moment().unix();
    const comment = { text, postedAt, author };
    this.props.editComment({ commentId, comment, id });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, fields: { commentText }, id, commentId } = this.props;

    return (
      <div className="padded">
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
    );
  }
}


EditComment = reduxForm({
  form: 'edit_comment',
  validate,
  fields: ['commentText']
})(EditComment);

export default connect(null, actions)(EditComment);
