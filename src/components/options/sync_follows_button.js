import React, { Component } from 'react';
import { connect } from 'react-redux';

import { syncFollowsList } from '../../actions';

class SyncFollowsButton extends Component {

  handleSyncFollows() {
    this.props.syncFollowsList();
  }

  render() {
    return (
      <button onClick={this.handleSyncFollows.bind(this)}>Sync</button>
    );
  }
}

const mapStateToProps = (state) => {
  let { user } = state;
  return { user };
};

export default connect(mapStateToProps, { syncFollowsList })(SyncFollowsButton);