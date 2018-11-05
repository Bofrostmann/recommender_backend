/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";

import API from "./../API";
import InputWrapper from "../InputWrapper";
import {Button} from "react-bootstrap";
import {Treebeard} from 'react-treebeard';

class DataOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data_type_name: ''
        };
        is_hierarchical = false;
        switch (this.props.data_type) {
            case 'feature':
                this.key_column = 'key';
                this.name_column = 'label';
                break;
            case 'region':
                this.key_column = 'unique_name';
                this.name_column = 'name';
                this.is_hierarchical = true;
            default:
                // do nothing
        }

    }

    data_requester = new API();

    componentDidMount() {
        switch (this.props.data_type) {
            case 'feature':
                this.data_requester.getAllFeatures().then(features => {
                    this.setState({data: Object.values(features), data_type_name: 'Feature'});
                });
                break;
            case 'region':
                this.data_requester.getAllRegions().then(regions => {
                    this.setState({data: Object.values(regions), data_type_name: 'Region'});
                });
                break;
            default:
            // do nothing
        }
    }

    addNewItem() {

    }

    render() {
        const NewButton = withRouter(({history}) => (
            <Button bsStyle="info"
                    type="button"
                    onClick={() => {
                        history.push('/' + this.props.data_type + 'Settings/NEW')
                    }}>
                Add new {this.state.data_type_name}
            </Button>
        ));

        return (
            <ul>
                {this.state.data.map(element => {
                    return (
                        <li key={element[this.key_column]}>
                            <Link to={'/' + this.props.data_type + 'Settings/' + element[this.key_column]}>
                                {element[this.name_column]}
                            </Link>
                        </li>
                    );
                })}
                <li>
                    <NewButton bsStyle="info"
                               type="link"
                               onClick={this.addNewItem}>
                        Add new {this.state.data_type_name}
                    </NewButton>
                </li>
            </ul>
        );
    }
}

InputWrapper.propTypes = {
    data_type: PropTypes.string
};

export default DataOverview;
