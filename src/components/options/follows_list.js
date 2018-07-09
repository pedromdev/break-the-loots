import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFollowsList } from '../../actions';
import ErrorMessage from '../error_message';
import FollowItem from './follow_item';

class FollowsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      follows: props.list,
      syncronized: false
    };
  }

  componentDidMount() {
    this.props.getFollowsList();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.list && !prevState.syncronized) {
      return {
        follows: nextProps.list,
        syncronized: true
      };
    }

    return prevState;
  }

  handleInputFilterKeyUp(e) {
    let { value } = e.target;
    let follows = this.props.list.filter((follow) => value == "" || follow.indexOf(value) > -1);
    this.setState({ follows });
  }

  render() {
    if (!this.state.follows) {
      return (
        <span>Synchronizing...</span>
      );
    }

    let followsItems = this.state.follows.map((followName) => <FollowItem follow={followName} key={followName} />);

    return (
      <div id="follows">
        <div className="field-group">
          <input
            className="do-not-block"
            type="text"
            placeholder="Search..."
            onKeyUp={this.handleInputFilterKeyUp.bind(this)} />
        </div>
        {(!this.props.errorMessage ? null : <ErrorMessage>{this.props.errorMessage}</ErrorMessage>)}
        <ul>
          {followsItems}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { follows } = state;
  let defaultProps = {
    errorMessage: null,
    list: null
  };

  if (!follows) return defaultProps;
  
  return follows;
};

export default connect(mapStateToProps, {
  getFollowsList
})(FollowsList);