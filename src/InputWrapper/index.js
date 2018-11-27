/**   region_recommender_frontend - 30.09.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';

import {ControlLabel, FormGroup, FormControl} from "react-bootstrap";
import PropTypes from "prop-types";
import "./InputWrapper.css"


class InputWrapper extends Component {
    render() {
        return (
            <FormGroup
                className={"input_wrapper " + this.props.className}
                controlId="formBasicText"
                validationState={this.props.getValidationState ? this.props.getValidationState : null}>
                <ControlLabel>{this.props.label}</ControlLabel>
                {this.props.children}
                <FormControl.Feedback/>
            </FormGroup>
        )
    };
}

InputWrapper.propTypes = {
    label: PropTypes.string,
    getValidationState: PropTypes.string,
    children: PropTypes.object,
    className: PropTypes.string
};

export default InputWrapper;
