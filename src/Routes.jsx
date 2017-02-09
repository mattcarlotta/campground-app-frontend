import _ from 'lodash';
import React from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

var actions = require('./actions/Actions');

import About from './components/About';
import App from './components/App';
import CampgroundsApp from './components/CampgroundsApp';
import CampgroundForm from './components/CampgroundForm';
import CampgroundShow from './components/CampgroundShow';
import EditCommentForm from './components/EditCommentForm';
import Landing from './components/Landing';
import NotFound from './components/NotFound';
import RequireAuth from './components/auth/RequireAuth';
import UserCP from './components/UserCP';

const store = require('./store/configureStore').configure();

const isLoggedIn = (nextState, replaceState) => {
  let state = store.getState();
  const { auth, signedinUser } = state;
  console.log(state);
  if (!auth.authenticated || _.isEmpty(signedinUser)) {
    replaceState({
      nextPathname: nextState.location.pathname
    }, '/')
    store.dispatch(actions.authError('You must be logged in to do that!'));
  }
}

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="about" onEnter={isLoggedIn} component={About} />
      <Route path="campgrounds" component={CampgroundsApp} />
      <Route path="campgrounds/new" component={RequireAuth(CampgroundForm)} />
      <Route path="campgrounds/edit/:id" component={RequireAuth(CampgroundForm)} />
      <Route path="campgrounds/:id" component={CampgroundShow} />
      <Route path="campgrounds/:id/comment/edit/:id" component={RequireAuth(EditCommentForm)} />
      <Route path="userCP" component={RequireAuth(UserCP)} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
