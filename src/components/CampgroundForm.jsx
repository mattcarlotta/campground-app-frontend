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
    if (this.props.params.id) {
      const { signedinUser } = this.props;
      this.checkAuthor(signedinUser).then(() => {
          this.handleInitialize();
        }, (err) => {
          this.props.authError('You do have permission to do that!');
          browserHistory.push('/');
      });
    }
  }

  checkAuthor(signedinUser) {
    const campgroundAuthor = this.props.campground.author;
    return new Promise(function(resolve,reject){
        campgroundAuthor === signedinUser ? resolve() : reject()
    });
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

  handleNavBar(Title) {
    if (this.props.params.id) {
      const id = this.props.params.id;
      const campgroundName = this.props.campground.name;
      return (
        <span>
          <li>
            <Link to={"/campgrounds/" + id}> {campgroundName} </Link> <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </li>
          <li>
            <span className="campground-name"> {Title} Campground</span>
          </li>
        </span>
      );
    } else {
      return (
        <span>
          <li>
            <span className="campground-name"> {Title} Campground</span>
          </li>
        </span>
      );
    }
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, fields: { name, image, description, location, zip } } = this.props;

    const Title = this.props.params.id ? "Edit" : "Add New"

    return (
      <div className="row">
        <div className="nav-container">
          <ul className="nav-breadcrumbs">
            <li>
              <Link to="/">Home </Link> <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </li>
            <li>
              <Link to="/campgrounds"> Campgrounds </Link> <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </li>
            {this.handleNavBar(Title)}
          </ul>
        </div>
        <div>
          <div className="small-centered large-6">
            <div className="container">
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
