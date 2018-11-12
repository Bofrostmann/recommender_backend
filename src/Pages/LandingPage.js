/**   backend - 15.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import TextInput from "../TextInput";
import {withRouter} from "react-router-dom";
import Modal from "react-bootstrap/es/Modal";
import {AuthenticationConsumer} from "./../AuthenticationContext";

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: "",
            password: "",
            user_is_logged_in: false
        }
    }

    onFieldChange = (event) => {
        this.setState({[event.field]: event.value});
        console.log(this.state);
        console.log(this.context);
    };

    componentDidUpdate = () => {
        console.log("blub", this.context);
    };

    submitForm = (event, login_function) => {
        event.preventDefault();

        login_function(this.state.password).then(success => {
            if (success) {
                this.createPopup("Success!", "You have been logged in successfully.");
                this.setState({user_is_logged_in: true});
            } else {
                this.createPopup("Oops!", "Wrong password, please try again.");
            }
        })
    };
    closePopup = () => {
        this.setState({popup: ''});
    };

    createPopup = (title, text) => {
        const OkButton = withRouter(({history}) => (
            <Button bsSize="large"
                    bsStyle="primary"
                    type="link"
                    href="#"
                    onClick={this.closePopup}>
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
        console.log(this.context);
        return (
            <AuthenticationConsumer>
                {({is_authenticated, login}) => (
                    <form onSubmit={event => this.submitForm(event, login)}>
                        <h1>Welcome to the region Recommender Backend!</h1>
                        {is_authenticated
                            ? ""
                            : (
                                <div>
                                    <TextInput name={'password'} value={this.state.password} label={'Password'}
                                               onChange={this.onFieldChange}
                                               type={"password"}/>

                                    <div className={"buttons"}>
                                        <Button bsSize="large"
                                                bsStyle="primary"
                                                type="submit">
                                            Login
                                        </Button>
                                    </div>
                                </div>)
                        }

                        {this.state.popup}
                    </form>
                )}
            </AuthenticationConsumer>
        );
    }
}
export default LandingPage;
