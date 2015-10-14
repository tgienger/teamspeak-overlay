import * as React from 'react';

class IChannel {
	channelId:string;
	channelName:string;
	parentId:string;
	children:IChannel[];
	constructor() {
		this.children = [];
	}
}

class ChannelListProps {
	public data:IChannel[];
	public parent:IChannel[];
}

export default class ChannelList extends React.Component<ChannelListProps, any> {
	private plugin:() => any;
	
	constructor(props) {
		super(props);
	}
	
	render() {
		let channels:JSX.Element;
		let newParent;
		newParent = [];
		
		let n:string;
		if (this.props.parent.length) {
			n = (parseInt(this.props.parent[0].parentId) + 1).toString();
		}
		
		const childStyle = {
			marginLeft: '50px'
		};
		
		let style;
		
		channels = (
			<div>
			{ 
				this.props.parent.map(j => {
					return this.props.data.map(i => {
						if (i.parentId === j.channelId) {
							i.children = [];
							j.children.push(i);
						}
						console.log(j.children);
						if (j.parentId !== '0') {
							style = childStyle;
						}
						
						if (i.parentId === n) {
							newParent.push(i);
						}
						
						return (
							<div style={style} key={j.channelId} >{j.channelName} {j.channelId} {j.parentId}
								<ChannelList 
									data={j.children}
									parent={newParent} />
							</div>
						);
					})
					
				})
			}
			</div>
		);
		return (
			<div>{channels}</div>
		);
	}
}