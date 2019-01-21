/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";

import API from './../../API'
import TextInput from "../../TextInput";
import WithForm from "./../WithForm";
import "./../general.css"
import ActivityContainer from "./ActivityContainer"
import {Tabs, Tab, Button, ButtonGroup} from "react-bootstrap";
import AirportContainer from "./AirportContainer";
import InputWrapper from "../../InputWrapper";
import SelectInput from "../../SelectInput";
import ForeignKeyTable from "../../ForeignKeyTable";

class RegionSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            regions: [],
            finished_loading: false,
            airport: {label: '', value: ''}
        };
        this.mode = props.match.params.item_key === 'NEW' ? 'NEW' : 'UPDATE';
        this.data_requester = new API();
        this.months = [
            {key: "jan", name: "January"},
            {key: "feb", name: "February"},
            {key: "mar", name: "March"},
            {key: "apr", name: "April"},
            {key: "may", name: "May"},
            {key: "jun", name: "June"},
            {key: "jul", name: "July"},
            {key: "aug", name: "August"},
            {key: "sep", name: "September"},
            {key: "oct", name: "October"},
            {key: "nov", name: "November"},
            {key: "dec", name: "December"}];
    }


    componentDidMount() {
        let fields = this.props.fields;
        fields.airports = [];
        this.data_requester.getAllRegions()
            .then(regions => {
                if (this.mode === 'UPDATE') {
                    const _this = this;
                    fields.name = regions[_this.props.match.params.item_key].name;
                    fields.cost_per_day = regions[_this.props.match.params.item_key].cost_per_day;
                    fields.id = regions[_this.props.match.params.item_key].id;
                    fields.unique_name = regions[_this.props.match.params.item_key].unique_name;
                    fields.parent_id = regions[_this.props.match.params.item_key].parent_id;
                    if (regions[_this.props.match.params.item_key].max_zoom_level !== null) {
                        fields.max_zoom_level = regions[_this.props.match.params.item_key].max_zoom_level;
                    } else {
                        fields.max_zoom_level = 0;
                    }
                    this.data_requester.getActivitiesOfRegion(fields.id)
                        .then(activity_values => {
                            this.data_requester.getAllActivites()
                                .then(activities => {
                                    activity_values.forEach(activity => {
                                        fields[activity.key + "$spring"] = activity.quality_spring;
                                        fields[activity.key + "$summer"] = activity.quality_summer;
                                        fields[activity.key + "$autumn"] = activity.quality_autumn;
                                        fields[activity.key + "$winter"] = activity.quality_winter;
                                    });
                                    this.setState({
                                        activities: Object.values(activities),
                                        regions: Object.values(regions)
                                    });
                                    this.props.setFormFields(fields);
                                });
                        });
                    this.data_requester.getAirportsOfRegion(fields.id)
                        .then(airports => {
                            if (airports.length > 0) {
                                airports.forEach((airport, i) => {
                                    fields.airports.push(i);
                                    fields['airport_name$' + i] = airport.name;
                                    fields['airport_city$' + i] = airport.city;
                                    fields['airport_country$' + i] = airport.country;
                                    fields['airport_iata_code$' + i] = airport.iata_code;
                                });
                            }
                            this.props.setFormFields(fields);
                        });
                    this.data_requester.getTimeOfTravelQualitiesOfRegion(fields.id)
                        .then(qualities => {
                            this.months.forEach(month => {
                                fields['quality$' + month.key] = qualities[month.key];
                            });
                            this.props.setFormFields(fields);
                        });

                    this.props.setFormSettings(this.mode, fields.unique_name, "region");
                } else {
                    this.data_requester.getAllActivites()
                        .then(activities => {
                            this.setState({activities: Object.values(activities), regions: Object.values(regions)});
                        });
                    this.props.setFormSettings(this.mode, null, "region");
                }
            });
    }

    onAirportAutocompleteChange = (event, i) => {
        this.props.on_field_change({field: "airport_name$" + i, value: event.value.name});
        this.props.on_field_change({field: "airport_country$" + i, value: event.value.country});
        this.props.on_field_change({field: "airport_city$" + i, value: event.value.city});
        this.props.on_field_change({field: "airport_iata_code$" + i, value: event.value.code});

    };

    createAirportFields = (i) => {
        return (
            <AirportContainer name={this.props.fields["airport_name$" + i]}
                              airport={this.state.airport}
                              onChange={event => {
                                  this.onAirportAutocompleteChange(event, i)
                              }}
                              city={this.props.fields["airport_city$" + i]}
                              country={this.props.fields["airport_country$" + i]}
                              code={this.props.fields["airport_iata_code$" + i]}
                              id={i}
                              key={i}/>
        );
    };

    getRegionOptions = () => {
        if (this.state.regions.length) {
            return this.state.regions.map(region => ({value: region.id, label: region.name}));
        } else {
            return [];
        }
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
                        <InputWrapper label={"Parent region"}>
                            <SelectInput name={"parent_id"} onChange={this.props.on_field_change}
                                         value={this.props.fields.parent_id} options={this.getRegionOptions()}/>
                        </InputWrapper>
                        <TextInput name={'max_zoom_level'} value={this.props.fields.max_zoom_level}
                                   label={'Maximum zoom level'}
                                   onChange={this.props.on_field_change} type={"number"}/>
                    </div>
                </div>
                <Tabs defaultActiveKey={1} id={1}>
                    <Tab eventKey={1} title="Activities">
                        <div className={"activity_rows"}>
                            {this.state.activities.map(activity => {
                                return (
                                    <ActivityContainer onChange={this.props.on_field_change}
                                                       label={activity.label}
                                                       activity_key={activity.key}
                                                       key={activity.key}
                                                       quality_spring={typeof this.props.fields[activity.key + "$spring"] === "undefined"
                                                           ? "" : this.props.fields[activity.key + "$spring"].toString()}
                                                       quality_summer={typeof this.props.fields[activity.key + "$summer"] === "undefined"
                                                           ? "" : this.props.fields[activity.key + "$summer"].toString()}
                                                       quality_autumn={typeof this.props.fields[activity.key + "$autumn"] === "undefined"
                                                           ? "" : this.props.fields[activity.key + "$autumn"].toString()}
                                                       quality_winter={typeof this.props.fields[activity.key + "$winter"] === "undefined"
                                                           ? "" : this.props.fields[activity.key + "$winter"].toString()}/>)
                            })}
                        </div>
                    </Tab>
                    <Tab eventKey={2} title={"Time of Travel Quality"}>
                        <div className={"time_of_travel_qualities"}>
                            {this.months.map(month => {
                                return (
                                    <TextInput name={"quality$" + month.key}
                                               value={this.props.fields["quality$" + month.key]}
                                               label={month.name}
                                               onChange={this.props.on_field_change}
                                               key={"quality$" + month.key}/>
                                )
                            })}
                        </div>
                    </Tab>
                    <Tab eventKey={3} title={"Airports"}>
                        <ForeignKeyTable field_name={"airports"}
                                         object_ids={this.props.fields["airports"]}
                                         object_type_name={"airport"}
                                         on_field_change={this.props.on_field_change}
                                         object_fields_function={this.createAirportFields}/>


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
        activity_key: PropTypes.string,
        label: PropTypes.string,
        id: PropTypes.number
    })
};

RegionSettings.defaultProps = {
    fields: {activity_key: '', label: '', id: -1}
};

export default WithForm(RegionSettings, 'region');
