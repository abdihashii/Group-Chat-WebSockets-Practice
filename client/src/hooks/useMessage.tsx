import { useEffect, useState } from 'react';
import type { TMessage } from '../types';

const useMessage = (groupChatId: string, userName: string) => {
	const [messages, setMessages] = useState<TMessage[]>([]);
	const [inputMessage, setInputMessage] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [ws, setWs] = useState<WebSocket | null>(null);

	useEffect(() => {
		// Clear the messages state when establishing a new WebSocket connection
		setMessages([]);

		const webSocket = new WebSocket(`ws://localhost:8080`);

		webSocket.onopen = () => {
			console.log('Connected to local server');

			// Send a join message with the groupChatId when the connection opens
			webSocket.send(
				JSON.stringify({ action: 'join', groupChatId, user: userName }),
			);
		};

		webSocket.onmessage = async (event) => {
			const messageData = JSON.parse(await event.data);

			// check if there was an error in the message
			if (messageData.error) {
				console.error(`WebSocket error: ${messageData.error}`);
				setError(messageData.error);
				return;
			}

			// If messageData.message is indeed an array of messages, consider replacing the current messages state
			// with the newly received message array to ensure correct state after reconnections
			setMessages((prevMessages) => [...prevMessages, messageData.message]);
		};

		setWs(webSocket);

		webSocket.onerror = (error) => {
			console.error(`WebSocket error `, error);
		};

		return () => {
			webSocket.close();
			console.log('Disconnected from local server');
		};
	}, [groupChatId, userName]);

	const sendMessage = (event: React.FormEvent) => {
		event.preventDefault();

		if (!ws || inputMessage.trim() === '') {
			return; // Do nothing if WebSocket isn't set up or message is empty
		}

		// Check if WebSocket connection is open
		if (ws.readyState === WebSocket.OPEN) {
			// Send message only if WebSocket connection is open
			ws.send(
				JSON.stringify({
					action: 'message',
					groupChatId,
					message: {
						id: crypto.randomUUID(),
						content: inputMessage,
						user: userName,
					},
				}),
			);
			setInputMessage(''); // Clear input message after sending
		} else {
			console.error('WebSocket is not open.');
			// Optionally, handle the "still connecting" state or errors differently here
		}
	};

	return {
		messages,
		inputMessage,
		setInputMessage,
		sendMessage,
		error,
	};
};

export default useMessage;
