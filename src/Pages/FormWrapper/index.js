/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import DataRequester from './../DataRequester'
import InputWrapper from "../InputWrapper";
import TextInput from "../TextInput";

class FormWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feature_key: '',
            label: ''
        }
    }

    data_requester = new DataRequester();

    componentDidMount() {
        const _this = this;
        this.data_requester.getAllFeatures().then(features => {
            _this.setState({
                feature_key: features[_this.props.match.params.item_key].key,
                label: features[_this.props.match.params.item_key].label
            });
        });
    }

    onFieldChange = (event) => {
        this.setState({[event.field]: event.value});
    };

    submitForm = (event) => {

    };

    render() {
        return (
            <form onSubmit={this.submitForm}>
                {this.props.children}
            </form>
        );
    }
}

export default FormWrapper;
