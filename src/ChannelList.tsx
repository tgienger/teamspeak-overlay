import * as React from 'react';
import Users from './Users';
import {Channel} from 'teamspeak';

// class IChannel {
// 	channelId: string;
// 	channelName: string;
// 	parentId: string;
// 	children: IChannel[];
// 	constructor() {
// 		this.children = [];
// 	}
// }

class ChannelListProps {
	public data: Channel[];
	public key;
	public isChild;
	public plugin;
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
					let children:Channel[] = [];
					let childrenList;
					
					if (parent.children.length) {
						childrenList = (
							<ChannelList
								plugin={this.props.plugin}
								isChild={true}
								key={parent.channelId}
								data={parent.children} />
						)
					}
					return (
						<div key={parent.channelId}>
							{parent.channelName}
							<Users
								serverInfo={{channelId: parent.channelId, serverId: parent.serverId}}
								plugin={this.props.plugin} />
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