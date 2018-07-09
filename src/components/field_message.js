import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FieldMessage extends Component {

  constructor(props, context) {
    super(props, context);

    this.messageRef = React.createRef();
    this.state = {
      initialized: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { value } = props;

    if (typeof value !== 'undefined' && !state.initialized) {
      return Object.assign({}, state, { value, initialized: true });
    }
    
    return null;
  }

  handleSaveMessage() {
    let { value } = this.messageRef.current;

    this.props.onSave(value);
  }

  handleChange(e) {
    let { value } = e.target;
    this.setState({ value });
  }

  render() {
    return (
      <div>
        <div className="field-group">
          <label>
            Message:
            <textarea
              ref={this.messageRef}
              value={this.state.value}
              onChange={this.handleChange.bind(this)}></textarea>
          </label>
          {this.props.children}
        </div>
        <button onClick={this.handleSaveMessage.bind(this)}>Save</button>
      </div>
    );
  }
};

FieldMessage.propTypes = {
  value: PropTypes.string,
  onSave: PropTypes.func.isRequired
};

export default FieldMessage;
