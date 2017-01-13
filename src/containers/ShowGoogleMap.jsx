import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Polyline, Marker } from 'react-google-maps';

class ShowGoogleMap extends Component {
  renderGoogleMap() {
    const name = this.props.weather.name;
    const {lat, lon:lng} = this.props.weather.coord;
    const markers = [{
      position: {
        lat,
        lng,
      },
      key: name,
      defaultAnimation: 2,
    }];

    const GettingStartedGoogleMap = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={12}
        defaultCenter={{ lat, lng }}
        onClick={props.onMapClick}
      >
        {props.markers.map(marker => (
        <Marker
          {...marker}
          onRightClick={() => props.onMarkerRightClick(marker)}
        />
      ))}
      </GoogleMap>
    ));

    return (
        <GettingStartedGoogleMap
          containerElement={
           <div style={{ height: "325px", width: "345px" }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={markers}
          onMarkerRightClick={this.handleMarkerRightClick}
        />
		);
	}

  render() {
    const { weather } = this.props;

    return (
      <div>
        {this.renderGoogleMap()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { weather: state.weather.weather };
}

export default connect(mapStateToProps)(ShowGoogleMap);
