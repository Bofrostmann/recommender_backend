/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */


import './DataOverview.css';

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";

import API from "./../API";
import InputWrapper from "../InputWrapper";
import {Button} from "react-bootstrap";
import {Treebeard} from 'react-treebeard';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


class DataOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data_type_name: ''
        };
        this.is_hierarchical = false;
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
                    this.setState({data: this.preprocessData(Object.values(features)), data_type_name: 'Feature'});
                });
                break;
            case 'region':
                this.data_requester.getAllRegions().then(regions => {
                    this.setState({data: this.preprocessData(Object.values(regions)), data_type_name: 'Region'});
                });
                break;
            default:
            // do nothing
        }
    }

    CreateChildrenOfElement = (id, data) => {
        let children = [],
            current_children;
        data.forEach(element => {
            if (element.parent_id === id && element.parent_id !== element.id) {
                current_children = this.CreateChildrenOfElement(element.id, data);
                if (current_children.length) {
                    children.push({
                        name: this.createLink(element, true),
                        children: current_children
                    });
                } else {
                    children.push({name: this.createLink(element)});
                }
            }
        });
        return children;
    };

    createLink = (element, use_wench) => {
        return (
            use_wench
                ? (
                    <div>
                        <span className={"folder"}>{element[this.name_column]}</span>
                        <Link to={'/' + this.props.data_type + 'Settings/' + element[this.key_column]}>
                            <FontAwesomeIcon icon="wrench"/>
                        </Link>
                    </div>)
                : (
                    <Link to={'/' + this.props.data_type + 'Settings/' + element[this.key_column]}>
                        {element[this.name_column]}
                    </Link>)
        );
    };


    preprocessData = (data) => {
        if (data.length) {
            if (this.is_hierarchical) {
                return this.CreateChildrenOfElement(0, data);
            } else {
                return data.map(element => {
                    return ({
                            name: this.createLink(element)
                        }
                    )
                })
            }
        } else return {};
    };

    onToggle = (node, toggled) => {
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({cursor: node});
    };

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
            <div className={'data_list_container'}>
                <Treebeard data={this.state.data} onToggle={this.onToggle}/>
                <NewButton/>
            </div>
        );
    }
}

InputWrapper
    .propTypes = {
    data_type: PropTypes.string
};

export default DataOverview;
