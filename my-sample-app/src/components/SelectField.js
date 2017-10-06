import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SelectField extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        const formattedData = this.formatData(this.props.options);
        this.state = {
            options : formattedData,
            selectedRecord : [],
            selectedValue : this.props.selectedValue
        };
    }

    getOptions() {
        return this.state.options;
    }

    getSelectedValue() {
        return this.state.selectedValue;
    }

    getSelectedRecord() {
        return this.state.selectedRecord;
    }

    isObject(item) {
        return item !== null && typeof item === 'object';
    }

    formatData(input) {
        let result;
        const isItemAnObject = this.isObject(this.props.options[0]);
        if (isItemAnObject) {
            result = this.__createFormattedDataForArrayOfObjects();
        } else {
            result = this.__createFormattedFromArrayOfStrings();
        }
        return result;
    }

    __createFormattedDataForArrayOfObjects() {
        const data = [];
        for(let i=0;i < this.props.options.length;i++) {
            const propItem = this.props.options[i];
            const item = Object.assign({},propItem);
            data.push(item);
        }
        return data;
    }
    __createFormattedFromArrayOfStrings() {
        const data = [];
        for(let i=0;i < this.props.options.length;i++) {
            const item = {};
            const propItem = this.props.options[i];
            item[this.props.fieldValue] = propItem;
            item[this.props.fieldLabel] = propItem;
            data.push(item);
        }
        return data;
    }

    getOptionItems() {
        let comboOptions = [];
        for (let i = 0; i < this.state.options.length;i++) {
            let item = this.state.options[i];
            comboOptions.push(<option key= {item[this.props.fieldValue]+'__'+i} value={item[this.props.fieldValue]}>{item[this.props.fieldLabel]}</option>);
        }
        return comboOptions;
    }

    onChange = (e) => {
        e.preventDefault();
        const options = this.getOptions();
        const selectedValue = e.target.value;
        const selectedRecord = options.filter(option => option[this.props.fieldValue] == selectedValue);
        this.setState({
            selectedRecord : [...selectedRecord],
            selectedValue : selectedValue
        });
        this.props.onChange && this.props.onChange([...selectedRecord]);
    }
    
    render() {
        const options = this.getOptionItems();
        const currentSelection = this.state.selectedValue;
        return(
            <select name="select"  disabled={this.props.disabled} required={this.props.required} value = {currentSelection} onChange={this.onChange}>
               { options }
            </select>
        );
    }
}

SelectField.defaultProps = {
    disabled : false,
    requried : false,
    fieldLabel : 'label',
    fieldValue : 'value',
};