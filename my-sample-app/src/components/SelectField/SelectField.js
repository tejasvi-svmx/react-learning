import React, { Component } from 'react';

export default class SelectField extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    const formattedData = this.formatData(this.props.options);
    this.state = {
      options: formattedData,
      selectedRecord: [],
      selectedValue: this.props.selectedValue,
    };
  }

  onChange = (e) => {
    e.preventDefault();
    const options = this.state.options;
    const selectedValue = e.target.value;
    const selectedRecord = options.filter(
      option => option[this.props.fieldValue] == selectedValue,
    );
    this.setState({
      selectedRecord: [...selectedRecord],
      selectedValue,
    });
    this.props.onChange && this.props.onChange([...selectedRecord]);
  };

  getOptionItems() {
    const { fieldValue, fieldLabel, fieldName } = this.props;
    return this.state.options.map((item, index) => (
      <option 
        key={fieldName+'__'+index}
        value={item[fieldValue]}
      >
        {item[fieldLabel]}
      </option>
    ));
  }

  formatData(input) {
    let result;
    const isItemAnObject = this.isObject(this.props.options[0]);
    if (isItemAnObject) {
      result = this.createFormattedDataForArrayOfObjects();
    } else {
      result = this.createFormattedFromArrayOfStrings();
    }
    return result;
  }

  createFormattedDataForArrayOfObjects() {
    const data = [];
    for (let i = 0; i < this.props.options.length; i++) {
      const propItem = this.props.options[i];
      const item = Object.assign({}, propItem);
      data.push(item);
    }
    return data;
  }
  
  createFormattedFromArrayOfStrings() {
    const data = [];
    for (let i = 0; i < this.props.options.length; i++) {
      const item = {};
      const propItem = this.props.options[i];
      item[this.props.fieldValue] = propItem;
      item[this.props.fieldLabel] = propItem;
      data.push(item);
    }
    return data;
  }

  isObject(item) {
    return item !== null && typeof item === 'object';
  }

  render() {
    const options = this.getOptionItems();
    const currentSelection = this.state.selectedValue;
    return (
      <select
        name="select"
        disabled={this.props.disabled}
        required={this.props.required}
        value={currentSelection}
        onChange={this.onChange}
      >
        {options}
      </select>
    );
  }
}

SelectField.defaultProps = {
  disabled: false,
  requried: false,
  fieldLabel: 'label',
  fieldValue: 'value',
};
