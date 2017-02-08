import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as actions from '../../actions/Actions';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.authError('You must be signed in to do that!');
        browserHistory.goBack();
      }
    }

    shouldComponentUpdate() {
      return true;
    }

    componentWillUpdate(nextProps, nextState) {
      if (!nextProps.authenticated) {
        this.props.authError('You must be signed in to do that!');
        browserHistory.goBack();
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      signedinUser: state.signedinUser.username
    };
  }

  return connect(mapStateToProps, actions)(Authentication);
}
