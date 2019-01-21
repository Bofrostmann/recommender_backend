/**   backend - 19.01.2019
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import TextInput from "../TextInput";
import ForeignKeyTable from "../ForeignKeyTable";
import API from "../API";
import WithForm from "./WithForm";
import PropTypes from "prop-types";

class GeneralSettings extends Component {
    constructor(props) {
        super(props);
        this.api = new API();
    }

    componentDidMount() {
        this.api.getAllSettings().then(settings => {
            let fields = this.props.fields;
            fields.settings = [];
            settings.forEach(setting => {
                fields.settings.push(setting.id);
                fields["key_" + setting.id] = setting.key;
                fields["value_" + setting.id] = setting.value;
            });
            fields.settings.sort(function (a, b) {
                return a - b
            });
            this.props.setFormFields(fields);
            this.props.setFormSettings("UPDATE", "key", "LABEL");
        });
    }

    createSettingFields = id => {
        return [
            <TextInput value={this.props.fields["key_" + id]}
                       onChange={this.props.on_field_change}
                       name={"key_" + id}
                       label={"Key"}
                       key={"key_" + id}/>,
            <TextInput value={this.props.fields["value_" + id]}
                       onChange={this.props.on_field_change}
                       name={"value_" + id}
                       label={"Value"}
                       key={"value_" + id}
                       className={"value"}/>
        ];
    };

    render() {
        return (
            <div>
                <ForeignKeyTable field_name={"settings"}
                                 object_ids={this.props.fields["settings"]}
                                 object_type_name={"setting"}
                                 on_field_change={this.props.on_field_change}
                                 object_fields_function={this.createSettingFields}
                                 className={"general_settings"}/>
            </div>
        );
    }
}

GeneralSettings.propTypes = {
    item_key: PropTypes.string,
    on_field_change: PropTypes.func,
    setFormSettings: PropTypes.func,
    setFormFields: PropTypes.func,
    fields: PropTypes.shape({
        settings: PropTypes.array
    })
};

GeneralSettings.defaultProps = {
    fields: {questions: []}
};

export default WithForm(GeneralSettings, 'settings');