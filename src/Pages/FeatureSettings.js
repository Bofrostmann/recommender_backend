/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import DataRequester from './../DataRequester'
import InputWrapper from "../InputWrapper";
import TextInput from "../TextInput";

class FeatureSettings extends Component {
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

        this.setState({[event.field]: event.value});
    };

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <InputWrapper>
                    <TextInput name={'feature_key'} value={this.state.feature_key} label={'Key'}
                               onChange={this.onFieldChange}/>
                </InputWrapper>
                DA bin ich: {this.state.feature_key} {this.state.label}
            </form>
        );
    }
}

export default FeatureSettings;
