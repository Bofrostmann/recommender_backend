/**   region_recommender_frontend - 30.09.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";
import Select from 'react-select/lib/Async'
import InputWrapper from "../InputWrapper";


class AsyncSelectInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || ''
        };
    };

    componentDidMount() {
        if (typeof this.props.value.value === 'undefined' && this.props.value !== '') {
            this.props.promise(this.props.value).then(airports => {
                const value = airports.find(airport => airport.value === this.props.value);
                this.setState({value});
                this.props.onChange({field: this.props.name, value: value});
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({value: nextProps.value});
        }
    }

    onInputChange = (value) => {
        this.props.onChange({field: this.props.name, value: value});
    };

    render() {
        return (
            <InputWrapper label={this.props.label} getValidationState={this.props.validation_state} className={"autocomplete"}>
                <Select loadOptions={this.props.promise} onChange={this.onInputChange}
                        value={this.state.value}/>
            </InputWrapper>
        );
    }
}

AsyncSelectInput.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    validation_state: PropTypes.oneOf(['success', 'warning', 'error', '']),
    promise: PropTypes.func,
    label: PropTypes.string
};

AsyncSelectInput.defaultProps = {
    validation_state: ""
};

export default AsyncSelectInput;