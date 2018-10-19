/**   region_recommender_frontend - 30.09.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";
import Presentational from "./Presentational";


class TextInput extends Component {
    constructor(props) {
        super(props);
        console.log("props", props);
        this.state = {
            value: props.value || ''
        };
    };

    componentDidMount() {
        this.props.onChange({field: this.props.name, value: this.state.value});
    };

    onInputChange = (event) => {
        this.setState({value: event.target.value});
        this.props.onChange({field: this.props.name, value: event.target.value});
    };

    getValidationState = () => {
        if (typeof this.state.value === 'undefined') {
            return;
        }
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    };

    render() {
        console.log("textinput", this);
        return (
            <Presentational label={this.props.label}
                            getValidationState={this.getValidationState()}
                            value={this.state.value}
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