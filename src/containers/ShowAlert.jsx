import React, { Component } from 'react'
import { connect } from 'react-redux';
import RenderAlert from './RenderAlert';

class ShowRenderAlert extends Component {
  renderAlert() {
    if (!this.props.signinModalState && !this.props.signupModalState) {
      return <RenderAlert />;
    }
  }
  render() {
    return (
      <span className="absolute">
        {this.renderAlert()}
      </span>
    );
  }
}


function mapStateToProps(state) {
  return {
    signinModalState: state.signinModalState,
    signupModalState: state.signupModalState
   };
}

export default connect(mapStateToProps)(ShowRenderAlert);
