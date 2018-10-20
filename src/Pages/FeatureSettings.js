/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";

import API from './../API'
import TextInput from "../TextInput";
import WithForm from "./WithForm";

class FeatureSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initial_key: "",
        };
        this.mode = props.match.params.item_key === 'NEW' ? 'NEW' : 'UPDATE';
    }

    data_requester = new API();

    componentDidMount() {
        const fields = this.props.fields;
        if (this.mode === 'UPDATE') {
            const _this = this;
            this.data_requester.getAllFeatures().then(features => {
                fields.feature_key = features[_this.props.match.params.item_key].key;
                fields.label = features[_this.props.match.params.item_key].label;
                fields.id = features[_this.props.match.params.item_key].id;
                fields.mode = this.mode;
                _this.setState({fields, initial_key: fields.feature_key});

            });
        } else if (this.mode === 'NEW') {
            fields.mode = this.mode;
            this.setState(fields);
        }
    }


    render() {
        const headline = this.props.match.params.item_key === 'NEW'
            ? "neues Feature anlegen"
            : "Feature '" + this.state.initial_key+ "' bearbeiten";
        return (
            <div>
                <h2>{headline}</h2>
                <TextInput name={'feature_key'} value={this.props.fields.feature_key} label={'Key'}
                           onChange={this.props.on_field_change}/>
                <TextInput name={'label'} value={this.props.fields.label} label={'Label'}
                           onChange={this.props.on_field_change}/>
            </div>
        );
    }
}

FeatureSettings.propTypes = {
    item_key: PropTypes.string,
    on_field_change: PropTypes.func,
    fields: PropTypes.shape({
        feature_key: PropTypes.string,
        label: PropTypes.string,
        id: PropTypes.number
    })
};

FeatureSettings.defaultProps = {
    fields: {feature_key: '', label: '', id: -1}
};

export default WithForm(FeatureSettings, 'feature', FeatureSettings.mode);
