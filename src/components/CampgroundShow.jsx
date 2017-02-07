import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import Comments from '../components/Comments';
import Favorites from '../containers/Favorites';
import RenderAlert from '../containers/RenderAlert';
import ShowGoogleMap from '../containers/ShowGoogleMap';
import * as actions from '../actions/Actions';

const ROOT_URL = 'http://openweathermap.org/img/w/';

class ShowCampground extends Component {
  componentWillMount() {
    this.props.fetchCampground(this.props.params.id);
    this.setState({ count: 5 });
  }

  onDeleteClick() {
    this.props.deleteCampground(this.props.params.id);
  }

  onEditClick() {
    browserHistory.push(`/campgrounds/edit/${this.props.params.id}`);
  }

  showAuthorButtons() {
    if (this.props.authenticated && this.props.signedinUser === this.props.campground.author) {
      return (
        <div className="marginalize">
          <button className="button warning small float-left rounded bold" onClick={this.onEditClick.bind(this)}>
            Edit
          </button>
          <button className="button alert small float-left rounded bold margin-left" onClick={this.onDeleteClick.bind(this)}>
          Delete
          </button>
        </div>
      );
    }
  }

  countdownTimer() {
    if (this.props.errorMessage) {
      this.timer = setInterval(() => {
        let newCount = this.state.count - 1;
        this.setState({
          count: newCount >= 0 ? newCount : 0
        });

        if (newCount === 0) {
          clearInterval(this.timer)
          this.timer = undefined;
          browserHistory.goBack();
        }
      }, 1000);
    }
  }

  renderFavoritesIcon() {
    if (this.props.authenticated && this.props.signedinUser) {
      return (
        <Favorites id={this.props.params.id} />
      )
    }
  }

  render() {
    const { campground, weather } = this.props;

    if (_.isEmpty(campground) || _.isEmpty(weather)) {
      return (
        <div className="row">
          <div className="columns medium-6 large-4 small-centered">
            <div className="content text-center">
              <h3><i className="fa fa-cog fa-spin"></i>Loading...</h3>
              <RenderAlert />
              {this.countdownTimer()}
            </div>
          </div>
        </div>
      );
    }

    const currentTemp = Math.round(weather.main.temp*9/5-459.67);
    const WEATHER_URL = `${ROOT_URL}${weather.weather[0].icon}.png`;
    const windSpeed = Math.round(weather.wind.speed);
    const { humidity } = weather.main;

    return (
      <div>
        <div className="row">
          <RenderAlert />
          <div className="columns medium-4 text-center">
            <div className="container campground-details rounded">
              <h3>{campground.name}</h3>
              <hr />
              <ShowGoogleMap />
              <hr />
              <h4>Current Weather</h4>
              <p>
                {weather.weather[0].description}
                <img src={WEATHER_URL} />
              </p>
              <hr />
              <h4>Current Temperature</h4>
              <p>{currentTemp}&deg;f</p>
              <h4>Current Wind Speed</h4>
              <p>{windSpeed} mph</p>
              <h4>Current Humidity</h4>
              <p>{humidity}%</p>
            </div>
            <div className="index-link">
              <button onClick={browserHistory.goBack} className="button primary rounded float-left">
                <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
              </button>
            </div>
          </div>
          <div className="columns medium-8">
            <div className="container campground rounded">
              <img className="large-image-container expand rounded" src={campground.image} />
              <p className="title text-center">{campground.name} - {campground.location}
              {this.renderFavoritesIcon()}
              </p>
              <div>
                <hr className="title-break"/>
              </div>
              <p className="description">{campground.description}</p>
              {this.showAuthorButtons()}
              <p className="submitted"><em>Submitted by: {campground.author}</em></p>
            </div>
            <Comments comments={campground.comments} id={this.props.params.id} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
    campground: state.campground,
    signedinUser: state.signedinUser.username,
    weather: state.weather
  };
}

export default connect(mapStateToProps, actions)(ShowCampground);
