import React from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

import About from './components/About';
import App from './components/App';
import CampgroundsApp from './components/CampgroundsApp';
import CampgroundForm from './components/CampgroundForm';
import CampgroundShow from './components/CampgroundShow';
import EditCommentForm from './components/EditCommentForm';
import Landing from './components/Landing';
import UserCP from './components/UserCP';

const store = require('./store/configureStore').configure();

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="about" component={About} />
      <Route path="campgrounds" component={CampgroundsApp} />
      <Route path="campgrounds/new" component={CampgroundForm} />
      <Route path="campgrounds/edit/:id" component={CampgroundForm} />
      <Route path="campgrounds/:id" component={CampgroundShow} />
      <Route path="comment/edit/:id" component={EditCommentForm} />
      <Route path="userCP" component={UserCP} />
    </Route>
  </Router>
);
