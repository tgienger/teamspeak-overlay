declare namespace __Teamspeak {
	
	interface Plugin extends Element {
		init?(params:any, callback:Function);
		getBookmarkList?(callback:Function);
		connectToServer?(params:any, callback:Function);
		connectToServerByBookmark?(params:any, callback:Function);
		disconnectFromServer?(params:any, callback:Function);
		getServerInfo?(serverId:string, callback:Function);
		getAllServersInfo?(callback:Function);
		getChannelInfo?(params:any, callback?:Function);
		getChannels?(serverId:string, callback:Function);
		createChannel?(params:any, callback:Function);
		switchChannel?(params:any, callback:Function);
		getClientInfo?(params:any, callback:Function);
		getChannelClientList?(params:any, callback:Function);
		sendTextMessage?(params:any, callback:Function);
		muteClient?(params:any, callback:Function);
		updateClientDeviceState?(params:any, callback:Function);
	}
	
	class Channel {
		public channelId:string;
		public channelName:string;
		public hasPassword:boolean;
		public isDefault:boolean;
		public topic:string;
		public maxClients:number;
		public clients:number;
		public parentId:string;
		public serverId:string;
		public isSubscribed:boolean;
		public children:Channel[];
	}
	
	class Client {
		public clientId:string;
		public nickname:string;
		public isAway:boolean;
		public isInputMuted:boolean;
		public isOutputMuted:boolean;
		public isRecording:boolean;
		public isTalking:boolean;
		public hasInputHardware:boolean;
		public hasOutputHardware:boolean;
		public awayMessage:string;
	}
}

declare module 'teamspeak' {
	export = __Teamspeak;
}