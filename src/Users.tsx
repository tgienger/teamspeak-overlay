/// <reference path="../typings/tsd" />

import * as React from 'react';
import {Plugin, Client} from 'teamspeak';

class UsersProps {
	serverInfo:{};
	plugin:Plugin;
}

export default class Users extends React.Component<UsersProps, any> {
	private plugin:Plugin;
	
	constructor(props:UsersProps) {
		super(props)
		this.plugin = this.props.plugin;
	}
	
	render() {
		
		let usersList:JSX.Element;
		let userCount:number;
		
		this.plugin.getChannelClientList(this.props.serverInfo, (err, clients:Client[]) => {
			if (err) {console.log(err);}
			userCount = clients.length;
			usersList = (
				<div>
					{
						clients.map(client => {
							return (
								<div>
									{client.nickname}
								</div>
							);
						})
					}
				</div>
			);
		});
		
		return (
			<div>
				Clients:
				{usersList}
			</div>
		);
	}
}