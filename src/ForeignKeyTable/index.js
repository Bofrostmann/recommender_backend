/**   backend - 10.12.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";

import './styles.css';

class ForeignKeyTable extends Component {
    createObjectFields = () => {
        if (typeof this.props.object_ids === 'undefined') {
            return [];
        }
        let objects = [];
        this.props.object_ids.forEach(object_id => {
            objects.push(
                <div className={"object_container"}
                key={"object_container_" + object_id}>
                    {this.props.object_fields_function(object_id)}
                    <Button bsStyle="warning" onClick={event => this.removeObject(event, object_id)}>
                        Remove {this.props.object_type_name}
                    </Button>
                </div>
            );
        });
        return objects;

    };
    addObject = () => {
        var id;
        if (typeof this.props.object_ids === "undefined" || !this.props.object_ids.length) {
            id = 0;
            this.props.on_field_change({field: this.props.field_name, value: [id]});
        } else {
            this.props.object_ids.sort(function (a, b) {
                return a - b
            });
            let id = this.props.object_ids[this.props.object_ids.length - 1] + 1;
            this.props.on_field_change({
                field: this.props.field_name,
                value: [...this.props.object_ids, id]
            });
        }
        if (typeof this.props.additional_add_object_callback !== 'undefined') {
            this.props.additional_add_object_callback(id);
        }
    };

    removeObject = (event, object_id) => {
        const i = this.props.object_ids.indexOf(object_id);
        if (i > -1) {
            this.props.object_ids.splice(i, 1);
        }
        this.props.on_field_change({
            field: this.props.field_name,
            value: this.props.object_ids
        });
    };


    render() {
        return (
            <div className={this.props.className}>
                {this.createObjectFields()}
                <Button bsStyle="info" onClick={this.addObject}>
                    Add {this.props.object_type_name}
                </Button>
            </div>
        );
    }
}

ForeignKeyTable.propTypes = {
    object_ids: PropTypes.array,
    object_type_name: PropTypes.string,
    field_name: PropTypes.string,
    on_field_change: PropTypes.func,
    object_fields_function: PropTypes.func,
    additional_add_object_callback: PropTypes.func,
    className: PropTypes.string
};

export default ForeignKeyTable;


