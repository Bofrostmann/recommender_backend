/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import DataRequester from "./../DataRequester";
import InputWrapper from "../InputWrapper";

class DataOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            active_feature: ''
        }
    }

    data_requester = new DataRequester();

    componentDidMount() {
        switch (this.props.data_type) {
            case 'feature':
                this.data_requester.getAllFeatures().then(features => {
                    this.setState({data: Object.values(features)});
                });
                break;
            default:
            // do nothing
        }
    }

    render() {
        return (
            <ul>
                {this.state.data.map(element => {
                    return (
                        <li>
                            <Link to={'/' + this.props.data_type + 'Settings/' + element.key} key={element.key}>
                                {element.label}
                            </Link>
                        </li>
                    );
                })}


            </ul>
        )
            ;
    }
}

InputWrapper.propTypes = {
    data_type: PropTypes.string
};

export default DataOverview;
