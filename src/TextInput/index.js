/**   region_recommender_frontend - 30.09.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";
import Presentational from "./Presentational";


class TextInput extends Component {
    constructor(props) {
        super(props);
    };

    onInputChange = (event) => {
        this.props.onChange({field: this.props.name, value: event.target.value});
    };

    getValidationState = () => {
        if (typeof this.props.value === 'undefined') {
            return;
        }
        const length = this.props.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    };

    render() {
        return (
            <Presentational label={this.props.label}
                            getValidationState={this.getValidationState()}
                            value={this.props.value}
                            onChange={this.onInputChange}
                            type={this.props.type}/>
        );
    }
}

TextInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};

TextInput.defaultProps = {};

export default TextInput;