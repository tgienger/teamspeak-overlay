import * as React from 'react';

class MenuProps {
	public visible:boolean;
}

export default class Menu extends React.Component<MenuProps, any> {
	constructor(props:MenuProps) {
		super(props);
	}
	
	render() {
		let menu:JSX.Element;
		
		if (this.props.visible) {
			menu = (
				<div>
					Menu Placeholder
				</div>
			);
		}
		return (
			<div>
				{menu}
			</div>
		);
	}
}