import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import CountdownTimer from './Timer.jsx';


// App component - represents the whole app
class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <header>
          <div className="btn-group">
            <button className="btn btn-primary" type="button">
              Unchecked Locations <span className="badge">{this.props.incompleteCount}</span>
            </button>
            <label className="hide-completed btn btn-primary">
              <input type="checkbox"
                    readOnly
                    checked={this.state.hideCompleted}
                    onClick={this.toggleHideCompleted.bind(this)}
                    autoComplete="off" />
              Hide Completed
            </label>
            <button className="btn btn-primary btn" data-title="Delete">
              Start Location Grab <span className="glyphicon glyphicon-map-marker"></span>
            </button>
            <CountdownTimer />
          </div>
        </header>
        <div>
          <table className="table table-bordred table-striped">
            <thead>
              <tr>
                <th>Complete</th>
                <th>User</th>
                <th>Task</th>
                <th>Privacy</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTasks()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Body.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, Body);
