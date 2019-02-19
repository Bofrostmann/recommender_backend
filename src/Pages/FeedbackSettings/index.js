/**   backend - 19.11.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import './FeedbackSettings.css';

import React, {Component} from 'react';
import PropTypes from "prop-types";

import TextInput from "../../TextInput";
import WithForm from "../WithForm";
import API from "../../API";
import ForeignKeyTable from "../../ForeignKeyTable";
import Checkbox from "../../Checkbox";

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
            fields.questions.sort(function (a, b) {
                return a - b
            });
            this.props.setFormFields(fields);
            this.props.setFormSettings("UPDATE", "key", "LABEL");
        });
    }

    createQuestionFields = id => {
        return [
            <Checkbox value={this.props.fields["question_is_active_" + id]}
                      label={"Active"}
                      onChange={this.props.on_field_change}
                      name={"question_is_active_" + id}
                      key={"question_is_active_" + id}/>,
            <TextInput value={this.props.fields["question_key_" + id]}
                       className={"key"}
                       onChange={this.props.on_field_change}
                       name={"question_key_" + id}
                       label={"Key"}
                       key={"question_key_" + id}/>,
            <TextInput value={this.props.fields["question_text_" + id]}
                       className={"question"}
                       onChange={this.props.on_field_change}
                       name={"question_text_" + id}
                       label={"Question"}
                       key={"question_text_" + id}/>
        ];
    };

    addObjectCallback = id => {
        this.props.on_field_change({
            field: "question_is_active_" + id,
            value: true
        });
    };


    render() {
        return (
            <div>
                <ForeignKeyTable field_name={"questions"}
                                 object_ids={this.props.fields["questions"]}
                                 object_type_name={"question"}
                                 on_field_change={this.props.on_field_change}
                                 object_fields_function={this.createQuestionFields}
                                 additional_add_object_callback={this.addObjectCallback}/>
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
        questions: PropTypes.array
    })
};

FeedbackSettings.defaultProps = {
    fields: {questions: []}
};

export default WithForm(FeedbackSettings, 'feedback');
