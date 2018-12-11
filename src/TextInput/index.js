/**   region_recommender_frontend - 30.09.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";
import Presentational from "./Presentational";


class TextInput extends Component {
    onInputChange = (event) => {
        this.props.onChange({field: this.props.name, value: event.target.value});
    };

    render() {
        return (
            <Presentational label={this.props.label}
                            getValidationState={""}
                            value={this.props.value}
                            onChange={this.onInputChange}
                            type={this.props.type}
                            className={this.props.className}/>
        );
    }
}

TextInput.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    className: PropTypes.string
};

TextInput.defaultProps = {};

export default TextInput;