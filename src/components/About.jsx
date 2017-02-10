import React from 'react';
import { Link } from 'react-router';

const About = () => {
  return (
    <div className="row">
      <div className="nav-container">
        <ul className="nav-breadcrumbs">
          <li>
            <Link to="/">Home </Link> <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </li>
          <li>
            <span className="campground-name"> About</span>
          </li>
        </ul>
      </div>
      <div className="columns medium-6 large-6 small-centered">
        <div className="text-center">
          <h1 className="page-title"> </h1>
        </div>
        <div className="container__header rounded text-center">
          <h1 className="message">About</h1>
          <p>This is a campground application built on React and Redux.</p>
          <hr />
          <p> Here are some of the tools I've used:</p>
          <ul>
            <li><a href="https://facebook.github.io/react" target="_blank">React</a> - Javascript App Framework</li>
            <li><a href="http://redux.js.org/" target="_blank">Redux</a> - State Container for Javascript Apps</li>
            <li><a href="http://foundation.zurb.com/" target="_blank">Foundation </a> - CSS Framework</li>
            <li><a href="https://www.mongodb.com/" target="_blank">MongoDB</a> - Back-End Server</li>
            <li><a href="http://heroku.com" target="_blank">Heroku</a> - Website Hoster</li>
          </ul>
        </div>
      </div>
    </div>
  );
};


export default About;
