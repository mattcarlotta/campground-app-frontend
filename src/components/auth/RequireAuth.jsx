import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as actions from '../../actions/Actions';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated && !this.props.signedinUser) {
        browserHistory.goBack();
      }
    }

    shouldComponentUpdate() {
      return true;
    }

    componentWillUpdate(nextProps, nextState) {
      if (!nextProps.authenticated && !nextProps.signedinUser) {
        browserHistory.goBack();
      }
    }

    render() {
      return (
        <span>
          {this.props.authenticated === true && this.props.signedinUser
            ? <ComposedComponent {...this.props} />
          : null
          }
        </span>
      )
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
