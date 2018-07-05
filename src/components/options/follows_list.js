import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFollowsList } from '../../actions';
import ErrorMessage from '../error_message';
import FollowItem from './follow_item';

class FollowsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      follows: props.list
    };
  }

  componentWillMount() {
    this.props.getFollowsList();
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

    let followsItems = this.state.follows.map((follow) => <FollowItem follow={follow} key={follow} />);

    return (
      <div>
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
  return follows;
};

export default connect(mapStateToProps, {
  getFollowsList
})(FollowsList);