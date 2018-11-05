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
import {Tabs, Tab, Button, ButtonGroup} from "react-bootstrap";
import AirportContainer from "./AirportContainer";

class RegionSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features: [],
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
                this.data_requester.getAirportsOfRegion(fields.id).then(airports => {
                    if (airports.length > 0) {
                        fields.number_of_airports = airports.length;
                        airports.forEach((airport, i) => {
                            fields['airport_name$' + i] = airport.name;
                            fields['airport_city$' + i] = airport.city;
                            fields['airport_iata_code$' + i] = airport.iata_code;
                        });
                    } else {
                        fields.number_of_airports = 1;
                    }
                    this.props.setFormFields(fields);
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

    addAirport = () => {
        this.props.on_field_change({field: 'number_of_airports', value: this.state.number_of_airports + 1});
    };
    removeAirport = () => {
        this.props.on_field_change({field: 'number_of_airports', value: this.state.number_of_airports - 1});
    };

    createAirportFields = () => {
        let airport_fields = [];
        for (let i = 0; i < this.props.fields.number_of_airports; i++) {
            airport_fields.push(
                <AirportContainer name={this.props.fields["airport_name$" + i]}
                                  onChange={this.props.on_field_change}
                                  city={this.props.fields["airport_city$" + i]}
                                  iata_code={this.props.fields["airport_iata_code$" + i]}
                                  id={i}/>
            );
        }
        return airport_fields;
    };


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
                <Tabs defaultActiveKey={1}>
                    <Tab eventKey={1} title="Activities">
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
                    </Tab>
                    <Tab eventKey={2} title={"Weather"}>
                        Weather
                    </Tab>
                    <Tab eventKey={3} title={"Airports"}>
                        {this.createAirportFields()}
                        <ButtonGroup className={"airport_buttons"}>
                            <Button bsStyle="info" onClick={this.addAirport}>
                                Add Airport
                            </Button>
                            <Button bsStyle="warning" onClick={this.removeAirport}>
                                Remove Airport
                            </Button>
                        </ButtonGroup>
                    </Tab>

                </Tabs>

            </div>
        );
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
