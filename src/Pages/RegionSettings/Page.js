/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";

import API from './../../API'
import TextInput from "../../TextInput";
import WithForm from "./../WithForm";
import "./../general.css"
import FeatureContainer from "./FeatureContainer"

class RegionSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initial_key: "",
            features: []
        };
        this.mode = props.match.params.item_key === 'NEW' ? 'NEW' : 'UPDATE';
    }

    data_requester = new API();

    componentDidMount() {
        let fields = this.props.fields;
        if (this.mode === 'UPDATE') {
            const _this = this;
            this.data_requester.getAllRegions().then(region => {
                fields.name = region[_this.props.match.params.item_key].name;
                fields.cost_per_day = region[_this.props.match.params.item_key].cost_per_day;
                fields.id = region[_this.props.match.params.item_key].id;
                fields.unique_name = region[_this.props.match.params.item_key].unique_name;

                this.data_requester.getFeaturesOfRegion(fields.id).then(feature_values => {
                    this.data_requester.getAllFeatures().then(features => {
                        feature_values.forEach(feature => {
                            fields[feature.key + "$spring"] = feature.quality_spring;
                            fields[feature.key + "$summer"] = feature.quality_summer;
                            fields[feature.key + "$autumn"] = feature.quality_autumn;
                            fields[feature.key + "$winter"] = feature.quality_winter;
                        });
                        this.setState({features: Object.values(features)});
                        this.props.setFormFields(fields);
                    });
                });
                this.props.setFormSettings(this.mode, fields.unique_name, "region");
            });
        } else {
            this.data_requester.getAllFeatures().then(features => {
                this.setState({features: Object.values(features)});
            });
            this.props.setFormSettings(this.mode, null, "region");
        }
    }


    render() {
        return (
            <div>
                <div className={"col_container"}>
                    <div className={"col"}>
                        <TextInput name={'unique_name'} value={this.props.fields.unique_name} label={'Unique Name'}
                                   onChange={this.props.on_field_change}/>
                        <TextInput name={'name'} value={this.props.fields.name} label={'Name'}
                                   onChange={this.props.on_field_change}/>
                    </div>
                    <div className={"col"}>
                        <TextInput name={'cost_per_day'} value={this.props.fields.cost_per_day} label={'Cost per day'}
                                   onChange={this.props.on_field_change} type={"number"}/>
                    </div>
                </div>
                <div className={"feature_rows"}>
                    {this.state.features.map(feature => {
                        return (
                            <FeatureContainer onChange={this.props.on_field_change}
                                              label={feature.label}
                                              feature_key={feature.key}
                                              key={feature.key}
                                              quality_spring={typeof this.props.fields[feature.key + "$spring"] === "undefined"
                                                  ? "" : this.props.fields[feature.key + "$spring"].toString()}
                                              quality_summer={typeof this.props.fields[feature.key + "$summer"] === "undefined"
                                                  ? "" : this.props.fields[feature.key + "$summer"].toString()}
                                              quality_autumn={typeof this.props.fields[feature.key + "$autumn"] === "undefined"
                                                  ? "" : this.props.fields[feature.key + "$autumn"].toString()}
                                              quality_winter={typeof this.props.fields[feature.key + "$winter"] === "undefined"
                                                  ? "" : this.props.fields[feature.key + "$winter"].toString()}/>)
                    })}
                </div>
            </div>
        )
            ;
    }
}

RegionSettings.propTypes = {
    item_key: PropTypes.string,
    on_field_change: PropTypes.func,
    setFormSettings: PropTypes.func,
    setFormFields: PropTypes.func,
    fields: PropTypes.shape({
        feature_key: PropTypes.string,
        label: PropTypes.string,
        id: PropTypes.number
    })
};

RegionSettings.defaultProps = {
    fields: {feature_key: '', label: '', id: -1}
};

export default WithForm(RegionSettings, 'region');
