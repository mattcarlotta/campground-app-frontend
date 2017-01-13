import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import * as actions from '../actions/Actions';
import SigninForm from '../components/auth/Signin';
import SignupForm from '../components/auth/Signup';

class RenderModal extends Component {
  displayModal() {
    <Modal
      isOpen={this.props.signinModalState}
      onRequestClose={this.props.signinModal}
      className="modal-content signin-modal-size rounded title"
      overlayClassName="modal-overlay"
      contentLabel="Sigin Modal"
    >
      <SigninForm />
      <p onClick={this.props.signinModal} className="text-center cursor">close</p>
    </Modal>
  }

  render() {
    return (
      <div>
        {this.displayModal()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    signinModalState: state.signinModalState,
    signupModalState: state.signupModalState
  }
}

export default connect(mapStateToProps, actions)(RenderModal);
