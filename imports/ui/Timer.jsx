import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';


function getLocation(){
  function repeatLog(){
    console.log("LOGGED!!!");
    navigator.geolocation.watchPosition(function(position) {
      //const text = position.coords.latitude + " " + position.coords.longitude
      const text = "https://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=13&size=300x300&sensor=false&markers=color:red%7C" + position.coords.latitude + "," + position.coords.longitude;
      Meteor.call('tasks.insert', text);
    });
  }
  repeatLog()
  //(function(){
  //    repeatLog()
  //    setTimeout(arguments.callee, 5*60*1000); // Log every 5 minutes
  //})();
}

var seconds = 60 * 5;

var CountdownTimer = React.createClass({
  getInitialState: function() {
    return {
      secondsRemaining: 0
    };
  },
  tick: function() {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining < 0) {
      getLocation();
      this.setState({ secondsRemaining: seconds});
    }
  },
  componentDidMount: function() {
    this.setState({ secondsRemaining: this.props.secondsRemaining });
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <button className="btn btn-primary" type="button">
        Seconds Remaining <span className="badge">{this.state.secondsRemaining}</span>
      </button>
    );
  }
});

export default createContainer(() => {
      return {
        secondsRemaining : seconds
      };
  }, CountdownTimer);
