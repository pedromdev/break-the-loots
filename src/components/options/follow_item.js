import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getFollowMessage, saveFollowMessage } from '../../actions';
import FieldMessage from '../field_message';
import ErrorMessage from '../error_message';

class FollowItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showFieldMessage: false
    };
  }

  componentDidUpdate() {
    if (this.state.showFieldMessage) {
      this.props.getFollowMessage(this.props.follow);
    }
  }

  renderFieldMessage() {
    if (!this.state.showFieldMessage) return null;

    return (
      <FieldMessage onSave={this.handleFieldMessageSave.bind(this)} value={this.props.message}>
        {!this.props.errorMessage ? null : (
          <ErrorMessage>{this.props.errorMessage}</ErrorMessage>
        )}
      </FieldMessage>
    );
  }

  handleAnchorClick(e) {
    e.preventDefault();

    let { showFieldMessage } = this.state;
    showFieldMessage = !showFieldMessage;

    this.setState({ showFieldMessage });
  }

  handleFieldMessageSave(message) {
    this.props.saveFollowMessage(this.props.follow, message);
  }

  render() {
    return (
      <li>
        <a href="#" onClick={this.handleAnchorClick.bind(this)}>
          {this.props.follow}
        </a>
        {this.renderFieldMessage()}
      </li>
    );
  }
}

FollowItem.propTypes = {
  follow: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const defaultProps = { message: undefined };
  let { user, followsConfigs } = state;
  let followConfig = {};
  
  if (!user || !followsConfigs[user.name] || !followsConfigs[user.name][ownProps.follow]) return defaultProps;

  followConfig = followsConfigs[user.name][ownProps.follow];
  return Object.assign({}, defaultProps, followConfig);
};

export default connect(mapStateToProps, {
  getFollowMessage,
  saveFollowMessage
})(FollowItem);