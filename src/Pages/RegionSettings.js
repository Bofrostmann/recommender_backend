/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";

import API from './../API'
import TextInput from "../TextInput";
import WithForm from "./WithForm";

class RegionSettings extends Component {
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
            this.data_requester.getAllRegions().then(region => {
                fields.unique_name = region[_this.props.match.params.item_key].unique_name;
                fields.name = region[_this.props.match.params.item_key].name;
                fields.cost_per_day = region[_this.props.match.params.item_key].cost_per_day;
                fields.id = region[_this.props.match.params.item_key].id;
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
            ? "Create new region"
            : "Edit region '" + this.state.initial_key+ "'";
        return (
            <div>
                <h2>{headline}</h2>
                <TextInput name={'unique_name'} value={this.props.fields.unique_name} label={'Unique Name'}
                           onChange={this.props.on_field_change}/>
                <TextInput name={'name'} value={this.props.fields.name} label={'Name'}
                           onChange={this.props.on_field_change}/>
                <TextInput name={'cost_per_day'} value={this.props.fields.cost_per_day} label={'Cost per day'}
                           onChange={this.props.on_field_change} type={"number"}/>
            </div>
        );
    }
}

RegionSettings.propTypes = {
    item_key: PropTypes.string,
    on_field_change: PropTypes.func,
    fields: PropTypes.shape({
        feature_key: PropTypes.string,
        label: PropTypes.string,
        id: PropTypes.number
    })
};

RegionSettings.defaultProps = {
    fields: {feature_key: '', label: '', id: -1}
};

export default WithForm(RegionSettings, 'region', RegionSettings.mode);
