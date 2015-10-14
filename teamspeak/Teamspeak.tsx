import * as React from 'react';

export default class Teamspeak extends React.Component<any, any> {
	plugin: () => any;
	
	constructor() {
		super()
	}
	
	componentDidMount() {
		console.log('mounting ts node');
		this.plugin = () => document.querySelector('#pluginTeamspeak');
		
		this.plugin().addEventListener('onServerStatusChange', data => {
			console.log('Server Status Change: ', data);
		});
		
		setTimeout(() => {
			this.plugin().init({name: "Overwolf-TeamSpeak-Sample"}, (result,servers) => {
				 console.log("result: ",result ,servers);
					
				  // no server is connected
				  if (servers && !servers.activeServerId)  {
					 this.plugin().connectToServer( { tab :"currentTab", 
												label:"ts3 public server", 
												address :"ck-gaming.com", 
												nickName:"premed-testing" },
												(result,server) => {
					   console.log("start new connection: ",result , server)
					 });
			     } else {
				 
					 this.plugin().getAllServersInfo((errorObject,servers) => {
					  console.log("All servers:" ,result , servers);
						this.plugin().getChannels(servers[0].serverId, (err, channels) => {
							if (err) {console.log(err);}
							console.log(channels);
						})
					 });
				 }
				});
		}, 500);
	}
	
	pluginTeamspeak = () => {
		
	}
	
	pluginLoaded = () => {
		
	}
	
	render() {
		return (
			<object id="pluginTeamspeak" type="application/x-overwolfteamspeakplugin"></object>
		);
	}
}
