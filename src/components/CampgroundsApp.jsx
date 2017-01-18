import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Campgrounds from '../containers/Campgrounds';
import filterCampgrounds from '../api/CampgroundAPI';
import RenderAlert from '../containers/RenderAlert';
import * as actions from '../actions/Actions';

class CampgroundsApp extends Component{
  componentWillMount() {
    this.props.fetchCampgrounds();
  }

  componentWillUnmount() {
    this.props.resetSearchText('');
  }

  showAddCampgroundButton() {
    if (this.props.authenticated) {
      return (
        <p>
          <Link to="/campgrounds/new" className="button primary rounded spaced">Add New Campground</Link>
        </p>
      );
    }
  }

  renderCampgrounds() {
    const { campgrounds, searchText } = this.props;

    if (!campgrounds) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    const foundCampgrounds = filterCampgrounds(campgrounds, searchText);

    if (foundCampgrounds.length === 0) {
      return (
        <div data-abide-error className="alert callout">
          <p><i className="fa fa-exclamation-triangle small-icon" aria-hidden="true"/> No campgrounds were found!</p>
        </div>
      );
    }

    return foundCampgrounds.map((campground) => {
      return (
        <Campgrounds key={campground._id} {...campground}/>
      )
    });
  };

  render() {

    return (
      <div className="row">
        <RenderAlert />
        <div className="text-center">
          <div className="row">
            <div className="small-centered large-12">
              <div className="jumbotron rounded text-left">
                <div className="inset">
                  <h1>Welcome to Yelp Camp</h1>
                  <h6>View our campgrounds from all over the United States!</h6>
                {this.showAddCampgroundButton()}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {this.renderCampgrounds()}
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    campgrounds: state.campgrounds.campgrounds,
    searchText: state.searchText,
  };
}

export default connect(mapStateToProps, actions)(CampgroundsApp);
