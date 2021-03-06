import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { IndexLink, Link, browserHistory } from 'react-router';

import * as actions from '../actions/Actions';
import RenderModal from '../containers/RenderModal';
import SigninForm from './auth/Signin';
import SignupForm from './auth/Signup';

class NavBar extends Component {
  handleChange(event) {
    event.preventDefault();
    let {dispatch} = this.props;
    let searchText = this.refs.searchText.value;

    this.props.setSearchText(searchText);
    browserHistory.push('/campgrounds');
  }

  renderLinks() {
    if (this.props.authenticated ) {
      const signedinUser = this.props.signedinUser;

      return [
        <div className="top-bar-right columns small-12 medium-4" key="0">
          <ul className="menu">
            <li>
              <Link to="/UserCP" className="menu-signedin"><i className="fa fa-user" aria-hidden="true"></i> Welcome, {signedinUser}!</Link>
            </li>
            <li>
              <Link onClick={this.props.signoutUser} key="0" activeClassName="active-link"><i className="fa fa-user-o" aria-hidden="true" /> Sign Out</Link>
            </li>
          </ul>
        </div>
      ];
    } else {
      // show a link to sign in or sign up
      return [
        <div className="top-bar-right columns small-12 medium-4" key="1">
          <ul className="menu">
            <li>
              <Link onClick={this.props.signinModal}><i className="fa fa-user-o" aria-hidden="true" /> Sign In</Link>
              <RenderModal
                isOpenModal={this.props.signinModalState}
                onReqClose={this.props.signinModal}
                classModal='modal-content signin-modal-size rounded title'
                overlayModal='modal-overlay'
                contentModal='Signin Modal'
                />
            </li>
            <li>
              <Link onClick={this.props.signupModal} key="1"  activeClassName="active-link"><i className="fa fa-user-plus" aria-hidden="true" /> Sign Up</Link>
                <RenderModal
                  isOpenModal={this.props.signupModalState}
                  onReqClose={this.props.signupModal}
                  classModal="modal-content signup-modal-size rounded title"
                  overlayModal="modal-overlay"
                  contentModal="Signup Modal"
                />
            </li>
          </ul>
        </div>
      ];
    }
  }
  render() {
    const { searchText } = this.props;

    return (
      <div className="top-bar columns medium-12">
        <div className="top-bar-left columns small-12 medium-4">
          <ul className="breadcrumbs">
            <li id="uppercased" className="menu-text"><i className="fa fa-free-code-camp" aria-hidden="true"/> Yelp Camp App</li>
            <li className="menu-text">
              <IndexLink to="/" activeClassName="active">Home</IndexLink>
            </li>
            <li className="menu-text">
              <IndexLink to="/about" activeClassName="active">About</IndexLink>
            </li>
            <li className="menu-text">
              <IndexLink to="/campgrounds" activeClassName="active">Campgrounds</IndexLink>
            </li>
          </ul>
        </div>
        <div className="top-bar-middle columns small-12 medium-4">
          <ul className="menu">
            <li>
              <form onChange={this.handleChange.bind(this)}>
                <ul className="menu">
                  <li><input className="text-center" type="search" placeholder="Search for campgrounds" ref="searchText" value={searchText} /></li>
                </ul>
              </form>
            </li>
          </ul>
        </div>
        {this.renderLinks()}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    signinModalState: state.signinModalState,
    signupModalState: state.signupModalState,
    signedinUser: state.signedinUser.username,
    searchText: state.searchText
   };
}

export default connect(mapStateToProps, actions)(NavBar);

// <Modal
//   isOpen={this.props.signinModalState}
//   onRequestClose={this.props.signinModal}
//   className="modal-content signin-modal-size rounded title"
//   overlayClassName="modal-overlay"
//   contentLabel="Sigin Modal"
// >
//   <SigninForm />
//   <p onClick={this.props.signinModal} className="text-center cursor">close</p>
// </Modal>
