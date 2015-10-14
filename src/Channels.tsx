/// <reference path="../typings/tsd" />

import * as React from 'react';
import ChannelList from './ChannelList';

interface IChannel extends Object {
	channelId:string;
	channelName:string;
	parentId:string;
	children:IChannel[];
}

class ChannelsProps {
	public visible: boolean;
}

export default class Channels extends React.Component<ChannelsProps, {}> {
	private plugin: () => any;
	private data: [IChannel];
	private parent: [IChannel];

	state = {
		data: this.data,
		parent:this.parent
	}

	constructor(props: ChannelsProps) {
		super(props);
	}

	componentDidMount() {
		this.plugin = () => document.querySelector('#pluginTeamspeak');

		this.plugin().addEventListener('onServerStatusChange', data => {
			console.log('Server Status Change: ', data);
			if (data.serverId) {
				this.plugin().getChannels(data.serverId, (err, channels) => {
					if (err) { console.log(err); }
					this.setState({
						data: channels.filter((i:IChannel) => {
							if (i.parentId !== '0') {
								return i;
							}
						}),
						parent: channels.filter((i:IChannel) => {
							if (i.parentId === '0') {
								i.children = [];
								return i;
							}
						})
					});
				});
			}
		});

		setTimeout(() => {
			const serverOptions = { tab: "currentTab", label: "ts3 public server", address: "ck-gaming.com", nickName: "premed-testing" };

			this.plugin().init({ name: "Overwolf-TeamSpeak-Sample" }, (result, servers) => {
					
				// no server is connected
				if (servers && !servers.activeServerId) {
					this.plugin().connectToServer(serverOptions, (result, server) => {
						this.plugin().getAllServersInfo((errorObject, servers) => {
							this.plugin().getChannels(servers[0].serverId, (err, channels:[IChannel]) => {

								if (err) { console.log(err); }
								this.setState({
									data: channels
								});
							});
						});
					});
				} else {
					// server is connected
					this.plugin().getAllServersInfo((errorObject, servers) => {
						this.plugin().getChannels(servers[0].serverId, (err, channels) => {
							if (err) { console.log(err); }

							this.handleData(channels);
						})
					});
				}
			});
		}, 500);
	}
	
	handleData = (channels) => {
		this.setState({
			data: channels.filter((i:IChannel) => {
				if (i.parentId !== '0') {
					return i;
				}
			}),
			parent: channels.filter((i:IChannel) => {
				if (i.parentId === '0') {
					i.children = [];
					return i;
				}
			})
		});
	}

	render() {

		let channels: JSX.Element;

		if (this.props.visible) {
			channels = (
				<div>
					<p>CHANNEL LIST</p>
					<ChannelList
						data={this.state.data}
						parent={this.state.parent} />
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