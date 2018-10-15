/**   region_recommender_frontend - 30.09.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React from 'react';

import {FormControl} from "react-bootstrap";
import InputWrapper from "../InputWrapper/index";
import PropTypes from "prop-types";


const Presentational = ({label, onChange, value, getValidationState, type}) => (
    <InputWrapper label={label} getValidationState={getValidationState}>
        <FormControl
            type={type}
            value={value}
            placeholder="Enter text"
            onChange={onChange}
        />
    </InputWrapper>
);

Presentational.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    getValidationState: PropTypes.string
};

export default Presentational;
