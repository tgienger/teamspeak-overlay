/// <reference path="../typings/tsd" />

import * as React from 'react';
import ChannelList from './ChannelList';

class ChannelsProps {
	public visible:boolean;
}

export default class Channels extends React.Component<ChannelsProps, {}> {
	private plugin:() => any;
	
	state = {
		data: [{}]
	}
	
	constructor(props:ChannelsProps) {
		super(props);
	}
	
	componentDidMount() {
		this.plugin = () => document.querySelector('#pluginTeamspeak');
		
		this.plugin().addEventListener('onServerStatusChange', data => {
			console.log('Server Status Change: ', data);
			if (data.serverId) {
				this.plugin().getChannels(data.serverId, (err, channels) => {
					if (err) {console.log(err);}
					this.setState({
						data: channels
					});
				});
			}
		});
		
		setTimeout(() => {
			this.plugin().init({name: "Overwolf-TeamSpeak-Sample"}, (result,servers) => {
					
				  // no server is connected
				  if (servers && !servers.activeServerId)  {
					 this.plugin().connectToServer( { tab :"currentTab", 
												label:"ts3 public server", 
												address :"ck-gaming.com", 
												nickName:"premed-testing" },
												(result,server) => {
													this.plugin().getAllServersInfo((errorObject,servers) => {
						this.plugin().getChannels(servers[0].serverId, (err, channels) => {
							if (err) {console.log(err);}
							this.setState({
								data: channels
							});
						})
					 });
					 });
			     } else {
				 
					 this.plugin().getAllServersInfo((errorObject,servers) => {
						this.plugin().getChannels(servers[0].serverId, (err, channels) => {
							if (err) {console.log(err);}
							this.setState({
								data: channels
							});
						})
					 });
				 }
				});
		}, 500);
	}

	render() {
		
		let channels:JSX.Element;
		
		if (this.props.visible) {
			channels = (
				<div>
					<p>CHANNEL LIST</p>
					<ChannelList
						data={this.state.data} />
				</div>
			);
		}
		
		return (
			<div>
				{channels}
			</div>
		);
	}
}