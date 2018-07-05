import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FieldMessage extends Component {

  constructor(props, context) {
    super(props, context);

    this.messageRef = React.createRef();
  }

  handleSaveMessage() {
    let { value } = this.messageRef.current;

    this.props.onSave(value);
  }

  render() {
    return (
      <div>
        <div className="field-group">
          <label>
            Message:
            <textarea ref={this.messageRef}>{this.props.value}</textarea>
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
