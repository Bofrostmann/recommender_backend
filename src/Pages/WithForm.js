/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import API from './../API'
import {withRouter} from "react-router-dom";

function WithForm(FormContent, update_key, mode) {
    class WithForm extends Component {
        constructor(props) {
            super(props);
            this.state = {
                fields: {},
                popup: ""
            };
            this.update_key = update_key;
        }

        onFieldChange = (event) => {
            const fields = this.state.fields;
            fields[event.field] = event.value;
            this.setState(fields);
        };

        submitForm = (event) => {
            event.preventDefault();
            const api = new API();
            console.log(this);
            let submit_promise;
            if (this.state.mode === 'NEW') {
                submit_promise = api.insertData(this.update_key, this.state.fields);
            } else {
                submit_promise = api.updateData(this.update_key, this.state.fields);
            }

            submit_promise.then(success => {
                if (success) {
                    let action_string;
                    if (this.state.mode === 'NEW') {
                        action_string = "created";
                    } else {
                        action_string = "updated";

                    }
                    this.createPopup("Finished!", "The element was "+ action_string + " successfully.");
                } else {
                    this.createPopup("Oops!", "The element could not be created");

                }
            })
        };

        deleteElement = (event) => {
            const api = new API();
            console.log("hier bin ich");
            console.log(this);
            if (this.state.fields.mode === 'UPDATE') {
                api.deleteData(this.update_key, this.state.fields.id).then(success => {
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
                            history.push('/features')
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
        }

        render() {
            return (
                <form onSubmit={this.submitForm}>
                    <FormContent  {...this.props} on_field_change={this.onFieldChange} fields={this.state.fields}/>
                    <div className={"buttons"}>
                        <Button bsSize="large"
                                bsStyle="danger"
                                type="link"
                                href="#"
                                onClick={this.deleteElement}>
                            Delete
                        </Button>
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
