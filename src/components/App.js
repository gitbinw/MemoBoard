import React from 'react';
import Board from './board/Board';
import s from '../../scss/main.scss';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="app-container">
				<h2 className="app-title">Memo Board</h2>
				<Board />
			</div>
		);
	}
}