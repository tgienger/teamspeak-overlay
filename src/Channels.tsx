/// <reference path="../typings/tsd" />

import * as React from 'react';
import ChannelList from './ChannelList';
import {Channel, Plugin} from 'teamspeak';

// class Channel {
// 	channelId:string;
// 	channelName:string;
// 	parentId:string;
// 	children:Channel[];
// 	constructor() {
// 		this.children = [];
// 	}
// }




class ChannelsProps {
	public visible: boolean;
}



/**
 * Collects Channel information form current server.
 */
export default class Channels extends React.Component<ChannelsProps, {}> {
	private plugin:Plugin;
	private data: Channel[];



	state = {
		data: this.data
	}




	constructor(props: ChannelsProps) {
		super(props);
	}




	componentDidMount() {
		this.plugin = document.querySelector('#pluginTeamspeak');
		
		this.plugin.addEventListener('onServerStatusChange', data => {
			console.log('Server Status Change: ', data);
			if (data.serverId) {
				this.plugin.getChannels(data.serverId, (err, channels:Channel[]) => {
					if (err) { console.log(err); }
					
					this.handleData(channels);
				});
			}
		});


		setTimeout(() => {
			const serverOptions = { tab: "currentTab", label: "ts3 public server", address: "ck-gaming.com", nickName: "premed-testing" };
			
			this.plugin.init({ name: "Overwolf-TeamSpeak-Sample" }, (result, servers) => {
					
				// no server is connected
				if (servers && !servers.activeServerId) {
					this.plugin.connectToServer(serverOptions, (result, server) => {
						this.plugin.getAllServersInfo((errorObject, servers) => {
							this.plugin.getChannels(servers[0].serverId, (err, channels:Channel[]) => {

								if (err) { console.log(err); }
								this.handleData(channels);
							});
						});
					});
				} else {
					// server is connected
					this.plugin.getAllServersInfo((errorObject, servers) => {
						this.plugin.getChannels(servers[0].serverId, (err, channels) => {
							if (err) { console.log(err); }
							this.handleData(channels);
						});
					});
				}
			});
		}, 500);
	}
	
	
	
	/**
	 * Sort Channels into a tree
	 */
	handleData = (channels) => {
		let test = [],
			sortedChannels:Channel[];
		
		channels.forEach((parent:Channel) => {
			parent.children = [];
			parent.children = channels.filter((child:Channel) => {
				if (child.parentId === parent.channelId) {
					return child;
				}
			})
		});
		
		sortedChannels = channels.filter((channel:Channel) => {
			if (channel.parentId === '0') {
				return channel;
			}
		});
		
		this.setState({
			data: sortedChannels
		});
	}




	render() {

		let channels: JSX.Element;
		let users: JSX.Element;

		if (this.props.visible) {
			channels = (
				<div>
					<p>CHANNEL LIST</p>
					<ChannelList
						plugin={this.plugin}
						isChild={false}
						key={'0'}
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