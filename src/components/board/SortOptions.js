import React from 'react';

export default function SortButton(props) {
    return (
        <select onChange={props.onSort}>
            <option value="">Sort</option>
            <option value="title">Sort by Title</option>
            <option value="created_date">Sort by Created Date</option>
        </select>
    )
}