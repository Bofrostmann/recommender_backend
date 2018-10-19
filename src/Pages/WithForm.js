/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';

function WithForm(FormContent) {
    class WithForm extends Component {
        constructor(props) {
            super(props);
            this.state = {
                fields: {}
            }
        }

        onFieldChange = (event) => {
            const fields = this.state.fields;
            fields[event.field] = event.value;
            this.setState(fields);
        };

        submitForm = (event) => {
        };

        render() {
            return (
                <form onSubmit={this.submitForm}>
                    <FormContent  {...this.props} on_field_change={this.onFieldChange} fields={this.state.fields}/>
                </form>
            );
        }
    }

    WithForm.displayName = `WithForm(${getDisplayName(FormContent)})`;

    function getDisplayName(FormContent) {
        return FormContent.displayName || FormContent.name || 'Component';
    }

    return WithForm;
}


export default WithForm;
