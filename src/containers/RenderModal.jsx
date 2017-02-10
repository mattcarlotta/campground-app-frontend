import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import * as actions from '../actions/Actions';
import SigninForm from '../components/auth/Signin';
import SignupForm from '../components/auth/Signup';

class RenderModal extends Component {
  displayModal() {
    const { isOpenModal, onReqClose, classModal, overlayModal, contentModal } = this.props;
    const Form = (contentModal === 'Signin Modal') ? <SigninForm /> : <SignupForm />

    return (
      <Modal
        isOpen={isOpenModal}
        onRequestClose={onReqClose}
        className={classModal}
        overlayClassName={overlayModal}
        contentLabel={contentModal}
      >
        {Form}
        <p onClick={onReqClose} className="text-center cursor">close</p>
      </Modal>
    );
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
