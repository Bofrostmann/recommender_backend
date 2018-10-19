/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";

import DataRequester from './../DataRequester'
import InputWrapper from "../InputWrapper";
import TextInput from "../TextInput";
import WithForm from "./WithForm";

class FeatureSettings extends Component {
    constructor(props) {
        super(props);
    }
    data_requester = new DataRequester();

    componentDidMount() {
        const _this = this;
        this.data_requester.getAllFeatures().then(features => {
            const fields = _this.props.fields;
            fields.feature_key = features[_this.props.match.params.item_key].key;
            fields.label = features[_this.props.match.params.item_key].label;
            _this.setState(fields);
        });
    }


    render() {
        return (
            <div>
                <InputWrapper>
                    <TextInput name={'feature_key'} value={this.props.fields.feature_key} label={'Key'}
                               onChange={this.props.on_field_change}/>
                </InputWrapper>
                {this.props.fields.feature_key}: {this.props.fields.label}
            </div>
        );
    }
}

FeatureSettings.propTypes = {
    item_key: PropTypes.string,
    on_field_change: PropTypes.func,
    fields: PropTypes.shape({
        feature_key: PropTypes.string,
        label: PropTypes.string
    })
};

FeatureSettings.defaultProps = {
    fields: {feature_key: ''}
};

export default WithForm(FeatureSettings);
