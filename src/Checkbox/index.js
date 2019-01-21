/**   region_recommender_frontend - 30.09.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";
import InputWrapper from "../InputWrapper";


class Checkbox extends Component {
    onInputChange = (event) => {
        this.props.onChange({field: this.props.name, value: event.target.checked});
    };

    render() {
        return (
            <InputWrapper label={this.props.label} className={"checkbox_container"}>
                <input name={this.props.name}
                       type="checkbox"
                       checked={this.props.value}
                       value={this.props.value}
                       onChange={this.onInputChange}/>
            </InputWrapper>
        );
    }
}

Checkbox.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.number
};

Checkbox.defaultProps = {};

export default Checkbox;