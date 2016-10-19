import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import Nav from '../imports/ui/Nav.jsx';
import Body from '../imports/ui/Body.jsx';

Meteor.startup(() => {
  render(<Nav />, document.getElementById('nav-target'));
  render(<Body />, document.getElementById('body-target'));
});
