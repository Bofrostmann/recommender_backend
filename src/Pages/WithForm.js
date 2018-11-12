/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import API from './../API'
import {withRouter} from "react-router-dom";

function WithForm(FormContent, item_type_key) {
    class WithForm extends Component {
        constructor(props) {
            super(props);
            this.state = {
                fields: {},
                popup: ""
            };
            this.item_type_key = item_type_key;
        };


        setFormSettings = (mode, item_name, item_type_name) => {
            this.mode = mode;
            this.setState({item_name: item_name, item_type_name: item_type_name});
        };

        onFieldChange = (event) => {
            const fields = this.state.fields;
            if (typeof event.value.value !== 'undefined') {
                fields[event.field] = event.value.value;
            } else {
                fields[event.field] = event.value;
            }
            this.setState(fields);
            console.log(fields[event.field]);
        };

        submitForm = (event) => {
            event.preventDefault();
            const api = new API();
            let submit_promise;
            if (this.mode === 'NEW') {
                submit_promise = api.insertData(this.item_type_key, this.state.fields);
            } else {
                submit_promise = api.updateData(this.item_type_key, this.state.fields);
            }

            submit_promise.then(success => {
                let action_string;
                if (this.mode === 'NEW') {
                    action_string = "created";
                } else {
                    action_string = "updated";
                }
                if (success) {
                    this.createPopup("Finished!", "The element was " + action_string + " successfully.");
                } else {
                    this.createPopup("Oops!", "The element could not be " + action_string);

                }
            })
        };

        setFormFields = (fields) => {
            this.setState({fields});
        };

        deleteElement = (event) => {
            const api = new API();
            if (this.mode === 'UPDATE') {
                api.deleteData(this.item_type_key, this.state.fields.id).then(success => {
                    if (success) {
                        this.createPopup("Finished!", "The element was deleted successfully.");
                    } else {
                        this.createPopup("Oops!", "The element could not be deleted");
                    }
                });
            }
        };

        createPopup = (title, text) => {
            const OkButton = withRouter(({history}) => (
                <Button bsSize="large"
                        bsStyle="primary"
                        type="link"
                        href="#"
                        onClick={() => {
                            history.push('/' + this.item_type_key + 's')
                        }}>
                    OK
                </Button>));
            this.setState({
                popup: (<div className="static-modal">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{text}</Modal.Body>
                        <Modal.Footer>
                            <OkButton/>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>)
            });
        };

        render() {
            const headline = this.mode === 'NEW'
                ? "Create new " + this.state.item_type_name
                : "Edit " + this.state.item_type_name + " '" + this.state.item_name + "'";
            const delete_button = this.mode === 'UPDATE'
                ? (<Button bsSize="large"
                           bsStyle="danger"
                           type="button"
                           href="#"
                           onClick={this.deleteElement}>
                    Delete
                </Button>)
                : '';
            return (
                <form onSubmit={this.submitForm}>
                    <h2>{headline}</h2>
                    <FormContent  {...this.props} on_field_change={this.onFieldChange} fields={this.state.fields}
                                  setFormSettings={this.setFormSettings}
                                  setFormFields={this.setFormFields}/>
                    <div className={"buttons"}>
                        {delete_button}
                        <Button bsSize="large"
                                bsStyle="primary"
                                type="submit">
                            Submit
                        </Button>
                    </div>
                    {this.state.popup}
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
