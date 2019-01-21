/**   backend - 05.11.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";
import TextInput from "../../TextInput";
import "./styles.css"
import AsyncSelectInput from "../../AsyncSelectInput"
import API from "../../API";

import InputWrapper from "../../InputWrapper";


class AirportContainer extends Component {
    constructor(props) {
        super(props);
        this.data_requester = new API();
    }

    render() {
        return (
            <div className={"airport_container use_box_shadow"}>
                <div className={"col_container"}>
                    <AsyncSelectInput value={this.props.airport} name={"airport"} onChange={this.props.onChange}
                                      label={"Airport"} promise={this.data_requester.getAirportAutocompleteOptions}/>
                    <div className={"col_container"}>
                        <InputWrapper label={"Name"}>
                            <div>{this.props.name}</div>
                        </InputWrapper>
                        <InputWrapper label={"City"}>
                            <div>{this.props.city}</div>
                        </InputWrapper>
                        <InputWrapper label={"Country"}>
                            <div>{this.props.country}</div>
                        </InputWrapper>
                        <InputWrapper label={"IATA Code"}>
                            <div>{this.props.code}</div>
                        </InputWrapper>
                    </div>
                </div>
            </div>
        );
    }
}

AirportContainer.propTypes = {
    code: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    name: PropTypes.string,
    airport: PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
    }),

    onChange: PropTypes.func
};

export default AirportContainer;