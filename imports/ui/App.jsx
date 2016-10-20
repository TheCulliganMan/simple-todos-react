import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Nav from './Nav.jsx';
import Body from './Body.jsx';

// App component - represents the whole app
class App extends Component {
  render() {
    return (
      <div className='container'>
        <Nav />
        <Body />
      </div>
    );
  }
}

export default createContainer(() => {
  return {};
}, App);
