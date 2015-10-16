import * as React from 'react';

class IChannel {
	channelId: string;
	channelName: string;
	parentId: string;
	children: IChannel[];
	constructor() {
		this.children = [];
	}
}

class ChannelListProps {
	public data: IChannel[];
	public key;
	public isChild;
}

export default class ChannelList extends React.Component<ChannelListProps, any> {
	private plugin: () => any;

	constructor(props) {
		super(props);
	}

	render() {
		let channels;
		
		const childStyle = {
			paddingLeft: '50px'
		}
		
		let style;
		
		if (this.props.isChild) {
			style = childStyle;
		}
		channels = (
			<div style={style} key={this.props.key}>
			{
				this.props.data.map((parent) => {
					let children:IChannel[] = [];
					let childrenList;
					
					if (parent.children.length) {
						childrenList = (
							<ChannelList
								isChild={true}
								key={parent.channelId}
								data={parent.children} />
						)
					}
					return (
						<div key={parent.channelId}>
							{parent.channelName}
							{childrenList}
						</div>
					);
				})
			}
			</div>
		);
		return (
			<div>{channels}</div>
		);
	}
}