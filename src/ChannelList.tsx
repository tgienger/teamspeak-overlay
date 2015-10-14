import * as React from 'react';

class ChannelListProps {
	public data:[{channelId:number, channelName:string}];
}

export default class ChannelList extends React.Component<ChannelListProps, any> {
	private plugin:() => any;
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				{ this.props.data.map(i => <div key={i.channelId} >{i.channelName}</div>) }
			</div>
		);
	}
}