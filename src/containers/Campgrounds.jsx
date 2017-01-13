import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Campgrounds extends Component {
  render() {
    let { _id, name, image, description, location } = this.props;

    return (
      <div className="small-12 large-4 columns align-left">
        <div className="image-container rounded">
          <div className="img-rounded">
            <img src={image} />
          </div>
          <Link to={"/campgrounds/" + _id} className="button primary expanded styled rounded">{name} - {location}</Link>
        </div>
      </div>
    )
  }
};
