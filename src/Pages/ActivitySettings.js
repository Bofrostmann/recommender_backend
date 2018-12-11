/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";

import API from './../API'
import TextInput from "../TextInput";
import WithForm from "./WithForm";

class ActivitySettings extends Component {
    constructor(props) {
        super(props);
        this.mode = props.match.params.item_key === 'NEW' ? 'NEW' : 'UPDATE';
    }


    data_requester = new API();

    componentDidMount() {
        const fields = this.props.fields;
        if (this.mode === 'UPDATE') {
            const _this = this;
            this.data_requester.getAllActivites().then(features => {
                fields.feature_key = features[_this.props.match.params.item_key].key;
                fields.label = features[_this.props.match.params.item_key].label;
                fields.id = features[_this.props.match.params.item_key].id;
                fields.mode = this.mode;
                _this.setState({fields, initial_key: fields.feature_key});

                this.props.setFormSettings(this.mode, fields.feature_key, "feature");
            });
        } else {
            this.props.setFormSettings(this.mode, null, "feature");
        }


    }


    render() {
        return (
            <div>
                <TextInput name={'feature_key'} value={this.props.fields.feature_key} label={'Key'}
                           onChange={this.props.on_field_change}/>
                <TextInput name={'label'} value={this.props.fields.label} label={'Label'}
                           onChange={this.props.on_field_change}/>
            </div>
        );
    }
}

ActivitySettings.propTypes = {
    item_key: PropTypes.string,
    on_field_change: PropTypes.func,
    setFormSettings: PropTypes.func,
    fields: PropTypes.shape({
        feature_key: PropTypes.string,
        label: PropTypes.string,
        id: PropTypes.number
    })
};

ActivitySettings.defaultProps = {
    fields: {feature_key: '', label: '', id: -1}
};

export default WithForm(ActivitySettings, 'feature');
