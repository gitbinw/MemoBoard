import React from 'react';

export const IDEA_BODY_CHAR_LIMITS = 140;

export default function IdeaBody(props) {
    return (
        <div>
            <textarea name="body" placeholder="Body" maxLength={IDEA_BODY_CHAR_LIMITS}
                onBlur={props.onUpdate}
                onChange={props.onChange}>
                {props.body}
            </textarea>
            <span className="body-remaining">{props.remaining >= 0 ? props.remaining + ' characters remaining.' : ''}</span>
        </div>
    )
}