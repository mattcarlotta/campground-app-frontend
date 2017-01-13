import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

import * as actions from '../../actions/Actions';
import RenderAlert from '../../containers/RenderAlert';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required';
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

class Signin extends Component {
  componentWillUnmount() {
    this.props.authError('');
  }

  handleFormSubmit(formProps) {
    this.props.signinUser(formProps);
  }


  render() {
    const { handleSubmit, pristine, reset, submitting, fields: { username, password } } = this.props;

    return (
      <div>
        <div id="signIn" className="small-centered large-12">
          <div className="container form-details rounded">
            <h1 className="title text-center">Sign In</h1>
            <hr />
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Field name="username" type="text" component={renderField} label="Username" />
              <Field name="password" type="password" component={renderField} label="Password" />
              <div>
                <button type="submit" className="button primary expanded rounded" disabled={submitting}>Submit</button>
                <button type="button" className="button alert expanded rounded" disabled={ pristine || submitting } onClick={ reset }>Clear Values</button>
              </div>
            </form>
          </div>
        <RenderAlert />
        </div>
      </div>
    )
  }
}

Signin = reduxForm({
  form: 'signin',
  validate,
  fields: ['username', 'password']
})(Signin);

export default Signin = connect(null, actions)(Signin);
