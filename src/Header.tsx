/// <reference path="../typings/tsd" />

import * as React from 'react';

class MenuProps {
	public toggleVisible:(string) => void;
}

export default class Header extends React.Component<MenuProps, any> {
	constructor(props:MenuProps) {
		super(props);
	}
	
	toggleMenu = () => {
		this.props.toggleVisible('menuVisible');
	}
	
	toggleChannels = () => {
		this.props.toggleVisible('channelsVisible');
	}
	
	render() {
		return (
			<div>
				<a href="#" onClick={this.toggleMenu}>Show Menu</a>
				<a href="#" onClick={this.toggleChannels}>Show Channels</a>
			</div>
		);
	}
}