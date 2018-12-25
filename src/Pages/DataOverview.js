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

        const opened_elements = localStorage.getItem('opened_elements');
        if (opened_elements === null || opened_elements === '') {
            this.state.opened_elements = [];
        } else {
            this.state.opened_elements = JSON.parse(opened_elements);
        }

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
                break;
            case 'algorithm':
                this.key_column = 'key';
                this.name_column = 'name';
                this.is_hierarchical = false;
                break;
            default:
            // do nothing
        }

    }

    findToggledRegionsOfNode = (node) => {
        let result = [];
        if (node.toggled) {
            result.push(node.id);
            node.children.forEach(child => {
                result = result.concat(this.findToggledRegionsOfNode(child));
            });
        }
        return result;
    };

    componentWillUnmount() {
        let toggled_regions = [];
        this.state.data.forEach(root_region => {
            toggled_regions = toggled_regions.concat(this.findToggledRegionsOfNode(root_region));
        });
        if (this.is_hierarchical) {
            localStorage.setItem('opened_elements', JSON.stringify(toggled_regions));
        }
    }

    data_requester = new API();

    componentDidMount() {
        switch (this.props.data_type) {
            case 'feature':
                this.data_requester.getAllActivites().then(features => {
                    this.setState({data: this.preprocessData(Object.values(features)), data_type_name: 'Feature'});
                });
                break;
            case 'region':
                this.data_requester.getAllRegions().then(regions => {
                    this.setState({data: this.preprocessData(Object.values(regions)), data_type_name: 'Region'});
                });
                break;
            case 'algorithm':
                this.data_requester.getAllAlgorithms().then(algorithms => {
                    this.setState({data: this.preprocessData(Object.values(algorithms)), data_type_name: 'Algorithm'});
                });
                break;
            default:
            // do nothing
        }
    }

    CreateChildrenOfElement = (id, data) => {
        let children = [],
            current_children,
            is_toggled = false;
        data.forEach(element => {
            if (element.parent_id === id && element.parent_id !== element.id) {
                current_children = this.CreateChildrenOfElement(element.id, data);
                is_toggled = this.state.opened_elements.includes(element.unique_name);
                if (current_children.length) {
                    children.push({
                        name: this.createLink(element, true),
                        children: current_children,
                        id: element.unique_name,
                        toggled: is_toggled
                    });
                } else {
                    children.push({name: this.createLink(element), id: element.unique_name, toggled: is_toggled});
                }
            }
        });
        return children;
    };

    createLink = (element, use_wench) => {
        const name = [element[this.name_column], ' ',
            <span className="key_col" key={element[this.key_column]}>[{element[this.key_column]}]</span>];
        return (
            use_wench
                ? (
                    <div>
                        <span className={"folder"}>{name}</span>
                        <Link to={'/' + this.props.data_type + 'Settings/' + element[this.key_column]}>
                            <FontAwesomeIcon icon="wrench"/>
                        </Link>
                    </div>)
                : (
                    <Link to={'/' + this.props.data_type + 'Settings/' + element[this.key_column]}>
                        {name}
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
                <div className={"buttons"}>
                    <NewButton/>
                </div>
            </div>
        );
    }
}

InputWrapper
    .propTypes = {
    data_type: PropTypes.string
};

export default DataOverview;
