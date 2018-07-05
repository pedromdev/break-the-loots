import React, { Component } from 'react';
import { connect } from 'react-redux';

import ErrorMessage from '../../error_message';

import InputNickname from '../input_nickname';
import SyncFollowsButton from '../sync_follows_button';
import FollowsList from '../follows_list';

class TwitchCollumn extends Component {

  render() {
    return (
      <div className="collumns">
        <h2>Twitch Follows</h2>
			  <p>You can configure a message per streamer. You just need to enter your nickname and save or synchronize data to update the follows list.</p>
        <div className="field-group">
          <div className="field-group">
            <InputNickname />
            <SyncFollowsButton />
          </div>
          <ErrorMessage>{this.props.nicknameError}</ErrorMessage>
        </div>
        <FollowsList />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { user } = state;

  return {
    nicknameError: !user ? null : user.errorMessage
  };
};

export default connect(mapStateToProps)(TwitchCollumn);