import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getNickname, saveNickname } from '../../actions';

class InputNickname extends Component {;

  constructor(props) {
    super(props);

    console.log(props);
    
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

    console.log(e.target.value)

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
          className="do-not-block"
          placeholder="Enter your Twitch nickname"
          defaultValue={this.state.nickname} 
          onKeyUp={this.handleKeyup.bind(this)}/>
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