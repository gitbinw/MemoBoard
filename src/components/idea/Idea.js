import React from 'react';
import IdeaTitle from './IdeaTitle';
import IdeaBody, * as Body from './IdeaBody';

export default class Idea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                title: props.title ? props.title : '',
                body: props.body ? props.body : ''
            },
            remaining: -1
        };

        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(e) {
        const target = e.target;
        const fieldName = target.name;
        const data = { [fieldName]: target.type == 'checkbox' ? target.checked : target.value };
        let formData = {};
        let remaining = -1;
        
        //show the number of remaining characters
        if (fieldName == 'body') {
            const len = Body.IDEA_BODY_CHAR_LIMITS - data[fieldName].length;
            if (len <= 15 && len >= 0) {
                remaining = len;
            }

            if (len < 0) {
                formData = Object.assign({}, this.state.formData);
            } else {
                formData = Object.assign({}, this.state.formData, data);
            }

        } else {
            formData = Object.assign({}, this.state.formData, data);
        }

        this.setState({
            formData: formData,
            remaining: remaining
        });
    }

    render() {
        const props = this.props;
        const idea = Object.assign({}, this.state.formData, {id: props.id});

        return (
            <div className="idea-box">
                <a className="button" onClick={() => { props.onDelete(props.id); } }>&#x2715;</a>
                <IdeaTitle {...idea}
                    onChange={this.handleFormChange} 
                    onUpdate={() => { props.onUpdate(idea); }} />
                <IdeaBody {...idea} 
                    remaining={this.state.remaining}
                    onChange={this.handleFormChange} 
                    onUpdate={() => { props.onUpdate(idea); }} />
            </div>
        );
    }
}