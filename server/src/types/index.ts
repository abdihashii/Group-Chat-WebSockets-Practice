import { WebSocket } from 'ws';

// Extend the WebSocket interface to include a groupChatId property
export interface ExtendedWebSocket extends WebSocket {
	groupChatId?: string;
}

export type TMessage = {
	error?: string;
	id?: string;
	content?: string;
	user?: string;
};
