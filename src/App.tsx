/// <reference path="../typings/tsd" />

import * as React from 'react';
import Menu from 'menu';
import Header from 'header';
import Channels from './Channels';

export default class App extends React.Component<any, any> {
	state = {
		menuVisible: false,
		channelsVisible: false
	}
	
	constructor(props: any) {
		super(props)
	}
	
	toggleVisible = (state:string) => {
		let newState = {};
		newState[state] = !this.state[state];
		this.setState(newState);
	}
	
	render() {
		return (
			<div>
				<Header
					toggleVisible={this.toggleVisible} />
				<Menu
					visible={this.state.menuVisible} />
				<Channels
					visible={this.state.channelsVisible} />
			</div>
		);
	}
}