import React from 'react';

export default class IdeaTitle extends React.Component {
    componentDidMount() {
        if (!this.props.title) this.titleInput.focus();
    }

    render() {
        return (
            <div>
                <input type="text" name="title" placeholder="Title"
                    ref={(input) => { this.titleInput = input; }}
                    onBlur={this.props.onUpdate}
                    onChange={this.props.onChange} 
                    value={this.props.title}
                />
            </div>
        );
    }
}