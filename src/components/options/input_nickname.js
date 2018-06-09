import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getNickname, saveNickname } from '../../actions';

class InputNickname extends Component {

  static propTypes = {
    onNicknameChange: PropTypes.func.isRequired
  };

  constructor(props) {
    this.state = {
      nickname: props.nickname
    };
  }

  componentWillMount() {
    this.props.getNickname();
  }

  handleSaveNickname() {
    this.props.saveNickname(this.state.nickname);
  }

  handleKeyup(e) {
    if (e.which == 13) {
      this.handleSaveNickname();
      return;
    }

    this.setState({
      nickname: e.target.value
    });
  }

  render() {
    return (
      <span>
        <input
          type="text"
          id="nickname"
          name="nickname"
          class="do-not-block"
          placeholder="Enter your Twitch nickname"
          value={this.state.nickname} 
          onKeyUp={this.handleKeypress.bind(this)}/>
				<button
          id="save-nickname"
          type="button"
          onClick={this.handleSaveNickname.bind(this)}>Save</button>
      </span>
    )
  }
}

const mapStateToProps = (state) => {
  let { user } = state;
  return {
    nickname: user ? user.name : ""
  }
};

export default connect(mapStateToProps, {
  getNickname,
  saveNickname
})(InputNickname);