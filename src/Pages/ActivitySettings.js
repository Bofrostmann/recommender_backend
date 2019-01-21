/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";

import API from './../API'
import TextInput from "../TextInput";
import WithForm from "./WithForm";
import Checkbox from "../Checkbox";

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
            this.data_requester.getAllActivites().then(activities => {
                fields.activity_key = activities[_this.props.match.params.item_key].key;
                fields.label = activities[_this.props.match.params.item_key].label;
                fields.id = activities[_this.props.match.params.item_key].id;
                fields.is_active = activities[_this.props.match.params.item_key].is_active;
                fields.mode = this.mode;
                _this.setState({fields, initial_key: fields.activity_key});

                this.props.setFormSettings(this.mode, fields.activity_key, "activity");
            });
        } else {
            this.props.setFormSettings(this.mode, null, "activity");
            //init is_active
            this.props.on_field_change({field: 'is_active', value: false});
        }


    }


    render() {
        return (
            <div>
                <TextInput name={'activity_key'} value={this.props.fields.activity_key} label={'Key'}
                           onChange={this.props.on_field_change}/>
                <TextInput name={'label'} value={this.props.fields.label} label={'Label'}
                           onChange={this.props.on_field_change}/>
                <Checkbox name={"is_active"}
                          onChange={this.props.on_field_change}
                label={"Active"}
                value={this.props.fields.is_active}/>
            </div>
        );
    }
}

ActivitySettings.propTypes = {
    item_key: PropTypes.string,
    on_field_change: PropTypes.func,
    setFormSettings: PropTypes.func,
    fields: PropTypes.shape({
        activity_key: PropTypes.string,
        label: PropTypes.string,
        is_active: PropTypes.bool,
        id: PropTypes.number
    })
};

ActivitySettings.defaultProps = {
    fields: {activity_key: '', label: '', id: -1, is_active: false}
};

export default WithForm(ActivitySettings, 'activity');
