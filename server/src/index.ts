import { WebSocketServer, WebSocket } from 'ws';
import { ExtendedWebSocket, TMessage } from './types';

const wss = new WebSocketServer({ port: 8080 });

const groupChatMap: Record<string, TMessage[]> = {
	'jimbos-group': [
		{
			id: '1',
			content: "Welcome to Jimbo's group chat!",
			user: 'Jimbo',
		},
		{
			id: '2',
			content: 'Happy to be here!',
			user: 'Boberson',
		},
	],
};

wss.on('connection', function connection(ws: ExtendedWebSocket) {
	ws.on('error', console.error);

	ws.on('message', function incoming(data) {
		try {
			const messageObj = JSON.parse(data.toString());
			const { action, groupChatId, message, user } = messageObj;

			switch (action) {
				case 'join':
					// check if the group exists, return an error if it doesn't
					if (!groupChatMap[groupChatId]) {
						console.error(`Group chat with id ${groupChatId} does not exist.`);

						// Send an error message back to the client
						ws.send(
							JSON.stringify({
								error: `Group chat with id ${groupChatId} does not exist.`,
							}),
						);

						// Exit early to stop further processing if the group doesn't exist
						return;
					}

					ws.groupChatId = groupChatId; // Attach the groupChatId to the WebSocket connection

					console.log(`${user} joined group: ${groupChatId}!`);

					// Send back all messages from this group
					if (groupChatMap[groupChatId]) {
						groupChatMap[groupChatId].forEach((message) => {
							ws.send(JSON.stringify({ groupChatId, message })); // Ensure structured message
						});
					}
					break;

				case 'message':
					console.log(
						`From '${message.user}' in '${groupChatId}': ${message.content}`,
					);

					if (!groupChatMap[groupChatId]) {
						groupChatMap[groupChatId] = [];
					}

					groupChatMap[groupChatId].push(message);

					// Broadcast the message in a structured format
					wss.clients.forEach((client: ExtendedWebSocket) => {
						if (
							client.readyState === WebSocket.OPEN &&
							client.groupChatId === groupChatId
						) {
							client.send(JSON.stringify({ groupChatId, message, user })); // Adjusted for structured message
						}
					});
					break;

				default:
					console.error('Unsupported action.');
			}
		} catch (err) {
			console.error('Failed to process message: ', err);
		}
	});
});

console.log('WebSocket server is running on port 8080.');
