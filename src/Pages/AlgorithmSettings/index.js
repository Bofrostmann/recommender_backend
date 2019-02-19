/**   backend - 10.12.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import './styles.css';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import WithForm from '../WithForm';
import API from '../../API';
import ForeignKeyTable from '../../ForeignKeyTable';
import TextInput from '../../TextInput';
import Checkbox from "../../Checkbox";

class AlgorithmSettings extends Component {
    constructor(props) {
        super(props);
        this.data_requester = new API();
        this.mode = props.match.params.item_key === 'NEW' ? 'NEW' : 'UPDATE';
        this.props.setFormSettings(this.mode, null, "algorithm");

        let fields = this.props.fields;
        fields.variables = [];
        fields.key = '';
        fields.name = '';
        fields.is_active = false;
        this.props.setFormFields(fields);
    }

    componentDidMount() {
        if (this.mode === 'UPDATE') {
            const fields = this.props.fields;
            this.data_requester.getAllAlgorithms()
                .then(algorithms => {
                    fields.key = algorithms[this.props.match.params.item_key].key;
                    fields.name = algorithms[this.props.match.params.item_key].name;
                    fields.id = algorithms[this.props.match.params.item_key].id;
                    fields.is_active = algorithms[this.props.match.params.item_key].is_active;
                    this.props.setFormSettings(this.mode, fields.name, "algorithm");
                    this.data_requester.getVariablesOfAlgorithm(fields.id)
                        .then(variables => {
                            variables.forEach((variable, i) => {
                                fields['variable_key$' + i] = variable.key;
                                fields['variable_value$' + i] = variable.value;
                                fields.variables.push(i);
                            });
                            this.props.setFormFields(fields);
                        })
                });
        }
    }

    variableFields = id => {
        let key = '',
            value = '';
        if (typeof this.props.fields['variable_key$' + id] !== 'undefined') {
            key = this.props.fields['variable_key$' + id];
        }
        if (typeof this.props.fields['variable_value$' + id] !== 'undefined') {
            value = this.props.fields['variable_value$' + id];
        }
        return [
            <TextInput
                name={'variable_key$' + id}
                onChange={this.props.on_field_change}
                value={key}
                label={'Key'}
                key={'variable_key$' + id}/>,
            <TextInput
                name={'variable_value$' + id}
                onChange={this.props.on_field_change}
                value={value}
                label={'Value'}
                key={'variable_value$' + id}/>
        ];
    };

    render() {
        return (
            <div className={"algorithm_settings"}>
                <div className={'use_box_shadow basic_data'}>
                    <Checkbox value={this.props.fields.is_active}
                              label={"Is active"}
                              onChange={this.props.on_field_change}
                              name={"is_active"}/>
                    <TextInput name={'key'}
                               onChange={this.props.on_field_change}
                               value={this.props.fields.key}
                               label={'Key'}/>
                    <TextInput name={'name'}
                               onChange={this.props.on_field_change}
                               value={this.props.fields.name}
                               label={'Name'}/>
                </div>
                <div className={'border_box_block'}>
                    <span className={'block_header'}>Parameters</span>
                    <ForeignKeyTable
                        object_fields_function={this.variableFields}
                        on_field_change={this.props.on_field_change}
                        object_type_name={'variable'}
                        object_ids={this.props.fields['variables']}
                        field_name={'variables'}/>
                </div>
            </div>
        );
    }
}

AlgorithmSettings.propTypes = {
    item_key: PropTypes.string,
    on_field_change: PropTypes.func,
    setFormSettings: PropTypes.func,
    setFormFields: PropTypes.func,
    fields: PropTypes.object
};
export default WithForm(AlgorithmSettings, 'algorithm');
