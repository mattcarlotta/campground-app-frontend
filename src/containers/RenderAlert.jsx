import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/Actions';

class RenderAlert extends Component {
  renderTimeout() {
    window.setTimeout(() => {
      this.props.authError('');
      this.props.authSuccess('');
    }, 2500);
  }

  displayMessage() {
    if (this.props.successMessage){
      return (
        <div className="callout success text-center" data-closable="slide-out-right">
          {this.renderTimeout()}
          {this.props.successMessage}
        </div>
      );
    } else if (this.props.errorMessage) {
        return (
          <div className="callout alert text-center" data-closable="slide-out-right">
            {this.renderTimeout()}
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> <strong>Error!</strong> {this.props.errorMessage}
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        {this.displayMessage()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    successMessage: state.auth.success
  }
}

export default connect(mapStateToProps, actions)(RenderAlert);
