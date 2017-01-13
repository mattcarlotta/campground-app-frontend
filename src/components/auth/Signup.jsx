import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

import RenderAlert from '../../containers/RenderAlert';
import * as actions from '../../actions/Actions';

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length < 3) {
    errors.username = 'Username must be more than 3 characters!';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 5) {
    errors.password = 'Password must be more than 5 characters!';
  }
  // if (!values.passwordConfirm) {
  //   errors.passwordConfirm = 'Required';
  // } else if (values.passwordConfirm !== values.password) {
  //   errors.passwordConfirm = 'Passwords must match!';
  // }
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

class Signup extends Component {
  componentWillUnmount() {
    this.props.authError('');
  }

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, fields: { email, username, password } } = this.props;

    return (
      <div>
        <div className="small-centered large-12">
          <div className="container form-details rounded">
            <h1 className="title text-center">Sign Up</h1>
            <hr />
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Field name="email" type="text" component={renderField} label="Email" />
              <Field name="username" type="text" component={renderField} label="Username" />
              <Field name="password" type="password" component={renderField} label="Password" />
              <div>
                <button type="submit" className="button primary expanded rounded" disabled={submitting}>Submit</button>
                <button type="button" className="button alert expanded rounded" disabled={ pristine || submitting } onClick={ reset }>Clear Values</button>
              </div>
            </form>
          </div>
        </div>
        <RenderAlert />
      </div>
    )
  }
}


Signup = reduxForm({
  form: 'signup',
  validate,
  fields: ['email', 'username', 'password']
})(Signup);

export default Signup = connect(null, actions)(Signup);
