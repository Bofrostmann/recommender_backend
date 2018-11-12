/**   region_recommender_frontend - 30.09.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";
import Select from 'react-select'


class SelectInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || ''
        };
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({value: nextProps.value});
        }
    }
    onInputChange = (event) => {
        this.props.onChange({field: this.props.name, value: event.value});
    };

    getSelectedOption = (value) => {
        return this.props.options.find(function (element) {
            return element.value === value;
        });
    };

    render() {
        return (
            <Select options={this.props.options} onChange={this.onInputChange} value={this.getSelectedOption(this.props.value)}/>
        );
    }
}

SelectInput.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.number,
    options: PropTypes.array
};

SelectInput.defaultProps = {};

export default SelectInput;