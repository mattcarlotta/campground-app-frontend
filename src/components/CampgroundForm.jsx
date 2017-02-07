import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

import * as actions from '../actions/Actions';
import EditCampground from '../containers/EditCampground';
import AddCampground from '../containers/AddCampground';
import RenderAlert from '../containers/RenderAlert';

const validate = values => {
  const errors = {}
  if(!values.name) {
    errors.name = 'Required';
  } else if  (values.name.length > 40){
    errors.name = 'Error! Must be 40 characters or less!';
  }
  if (!values.image) {
    errors.image = 'Required';
  }
  if (!values.description) {
    errors.description = 'Required';
  }  else if  (values.description.length > 1000) {
    errors.description = 'Error! Must be 1000 characters or less!';
  }
  if (!values.location) {
    errors.location = 'Required';
  }
  if (!values.zip) {
    errors.zip = 'Required';
  } else if (values.zip.length !== 5) {
    errors.zip = "Error! Must be a 5 digit zip code!"
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

class CampgroundForm extends Component {
  componentDidMount() {
    if (this.props.params.id) this.handleInitialize();
  }

  handleFormSubmit(formProps) {
    if (this.props.params.id) {
      formProps = { id: this.props.params.id, ...formProps};
      this.props.editCampground(formProps);
    } else {
      formProps = { ...formProps, author: this.props.signedinUser}
      // console.log(formProps);
      this.props.addNewCampground(formProps);
    }
  }

  handleTitle() {
    if (this.props.params.id) {
      return (<EditCampground />);
    } else {
      return (<AddCampground />);
    }
  }

  handleInitialize() {
    const initData = {
      "name": this.props.campground.name,
      "image": this.props.campground.image,
      "description": this.props.campground.description,
      "location": this.props.campground.location,
      "zip": this.props.campground.zip,
    }
    this.props.initialize(initData);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, fields: { name, image, description, location, zip } } = this.props;

    return (
      <div className="row padded">
        <div className="small-centered large-6">
          <div className="container form-details rounded">
            {this.handleTitle()}
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Field name="name" type="text" component={renderField} label="Campground Name" />
              <Field name="image" type="text" component={renderField} label="Image URL" />
              <Field name="description" type="text" component={renderField} label="Brief Description" />
              <Field name="location" type="text" component={renderField} label="Location" />
              <Field name="zip" type="number" component={renderField} label="5 Digit Zip Code" />
              <div>
                <button type="submit" className="button primary expanded rounded" disabled={submitting}>Submit</button>
                <button type="button" className="button alert expanded rounded" disabled={ pristine || submitting } onClick={ reset }>Clear Values</button>
              </div>
            </form>
          </div>
          <RenderAlert />
        </div>
        <div className="index-link">
          <Link onClick={browserHistory.goBack} className="button primary rounded float-left"><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</Link>
        </div>
      </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    campground: state.campground,
    signedinUser: state.signedinUser.username,
  };
}

CampgroundForm = reduxForm({
  form: 'campground',
  validate,
  fields: ['name', 'image', 'description', 'location', 'zip']
})(CampgroundForm);

export default CampgroundForm = connect(mapStateToProps, actions)(CampgroundForm);
