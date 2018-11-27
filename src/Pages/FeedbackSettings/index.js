/**   backend - 19.11.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React, {Component} from 'react';
import PropTypes from "prop-types";

import './FeedbackSettings.css';

import TextInput from "../../TextInput";
import WithForm from "../WithForm";
import {Button, ButtonGroup, Tab} from "react-bootstrap";
import InputWrapper from "../../InputWrapper";
import API from "../../API";

class FeedbackSettings extends Component {
    constructor(props) {
        super(props);
        this.data_requester = new API();
    }
    componentDidMount() {
        this.data_requester.getAllFeedbackQuestions().then(questions => {
            let fields = this.props.fields;
            fields.questions = [];
            questions.forEach(question => {
                fields.questions.push(question.id);
                fields["question_is_active_" + question.id] = question.is_active;
                fields["question_key_" + question.id] = question.key;
                fields["question_text_" + question.id] = question.text;
            });
            fields.questions.sort(function(a, b){return a - b});
            this.props.setFormFields(fields);
            this.props.setFormSettings("UPDATE", "key", "LABEL");
        });
    }

    createFeedbackQuestionFields = () => {
        if (typeof this.props.fields.questions === 'undefined') {
            return [];
        }
        let questions = [];
        this.props.fields.questions.forEach(question_id => {
            questions.push(
                <div className={"question_container"}>
                    <InputWrapper label={"Active"} className={"is_active"}>
                        <input name={"question_is_active_" + question_id}
                            type="checkbox"
                            checked={this.props.fields["question_is_active_" + question_id]}
                            value={this.props.fields["question_is_active_" + question_id]}
                            onChange={this.onCheckboxChange}/>
                    </InputWrapper>
                    <TextInput value={this.props.fields["question_key_" + question_id]}
                               className={"key"}
                               onChange={this.props.on_field_change}
                               name={"question_key_" + question_id}
                               label={"Key"}/>
                    <TextInput value={this.props.fields["question_text_" + question_id]}
                               className={"question"}
                               onChange={this.props.on_field_change}
                               name={"question_text_" + question_id}
                               label={"Question"}/>
                    <Button bsStyle="warning" onClick={event => this.removeQuestion(event, question_id)}>
                        Remove Question
                    </Button>
                </div>
            );
        });
        return questions;

    };
    addQuestion = () => {
        if (!this.props.fields.questions.length) {
            this.props.on_field_change({field: "questions", value: [0]});
        } else {
            this.props.fields.questions.sort(function(a, b){return a - b});
            let id = this.props.fields.questions[this.props.fields.questions.length - 1] + 1;
            this.props.on_field_change({
                field: "questions",
                value: [...this.props.fields.questions, id]
            });
            this.props.on_field_change({
                field: "question_is_active_" + id,
                value: true
            });
        }
    };

    removeQuestion = (event, question_id) => {
        let questions = this.props.fields.questions;
        const i = questions.indexOf(question_id);
        if (i > -1) {
            questions.splice(i, 1);
        }
        this.props.on_field_change({
            field: "questions",
            value: questions
        });
    };

    onCheckboxChange = event => {
        this.props.on_field_change({field: event.target.name, value: event.target.checked})
    };


    render() {
        return (
            <div>
                <input
                    name="use_feedback"
                    type="checkbox"
                    checked={this.props.fields.use_feedback}
                    value={this.props.fields.use_feedback}
                    onChange={this.onCheckboxChange}/> Collect user feedback
                {this.createFeedbackQuestionFields()}
                <Button bsStyle="info" onClick={this.addQuestion}>
                    Add Question
                </Button>

            </div>
        );
    }
}

FeedbackSettings.propTypes = {
    item_key: PropTypes.string,
    on_field_change: PropTypes.func,
    setFormSettings: PropTypes.func,
    setFormFields: PropTypes.func,
    fields: PropTypes.shape({
        use_feedback: PropTypes.bool,
        questions: PropTypes.array
    })
};

FeedbackSettings.defaultProps = {
    fields: {use_feedback: true, questions: []}
};

export default WithForm(FeedbackSettings, 'feedback');
