import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });
    console.log(this.props.task);
    return (
      <tr>
        <td>
          <input
            type="checkbox"
            readOnly
            checked={this.props.task.checked}
            onClick={this.toggleChecked.bind(this)}
          />
        </td>
        <td>
          <span className="text">
            <strong>{this.props.task.username}</strong>
          </span>
        </td>
        <td>
          <img src={this.props.task.text} />
          <p>{this.props.task.createdAt.toTimeString()}</p>
        </td>
        <td>
          { this.props.showPrivateButton ? (
            <button className={ this.props.task.private ? 'toggle-private btn-xs btn-primary' : 'toggle-private btn-xs btn-warning' } onClick={this.togglePrivate.bind(this)}>
              { this.props.task.private ? 'Private' : 'Public' }
            </button>
          ) : ''}
        </td>
        <td className={taskClassName}>
          <button className="btn btn-danger btn-xs" data-title="Delete" onClick={this.deleteThisTask.bind(this)}>
            <span className="glyphicon glyphicon-trash"></span>
          </button>
        </td>
      </tr>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};
