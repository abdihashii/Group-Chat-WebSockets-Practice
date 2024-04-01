import { useParams, useNavigate } from 'react-router-dom';
import useMessage from '../hooks/useMessage';
import MessageList from './MessageList';
import { ArrowLeft } from 'lucide-react';
import { useContext } from 'react';
import { CurrentUserContext } from '../App';
import useDocumentTitle from '../hooks/useDocumentTitle';

const ChatRoom = () => {
	const navigate = useNavigate();
	const { groupChatId } = useParams<{ groupChatId: string }>();
	const { currentUser } = useContext(CurrentUserContext);

	useDocumentTitle(groupChatId ?? '');

	const { messages, inputMessage, setInputMessage, sendMessage, error } =
		useMessage(groupChatId ?? '', currentUser ?? '');

	if (error) {
		return (
			<main className="flex min-h-screen flex-col items-center gap-10 bg-gray-100 p-10">
				<section className="flex w-full max-w-md flex-row items-center gap-10">
					<button
						onClick={() => navigate('/')}
						className="rounded-md bg-gray-200 p-2 transition-colors hover:bg-gray-300"
					>
						<ArrowLeft />
					</button>

					<h1 className="text-3xl font-bold">
						No group chat with ID: {groupChatId} exists
					</h1>
				</section>
			</main>
		);
	}

	return (
		<main className="flex min-h-screen flex-col items-center gap-10 bg-gray-100 p-10">
			<section className="flex w-full max-w-md flex-row items-center gap-10">
				<button
					onClick={() => navigate('/')}
					className="rounded-md bg-gray-200 p-2 transition-colors hover:bg-gray-300"
				>
					<ArrowLeft />
				</button>

				<h1 className="line-clamp-1 text-3xl font-bold">{groupChatId}</h1>
			</section>

			{messages.length > 0 && <MessageList messages={messages} />}

			<form onSubmit={sendMessage} className="flex w-full max-w-md gap-2">
				<input
					type="text"
					className="w-3/4 rounded-md border border-gray-300 p-2"
					placeholder="Type a message..."
					value={inputMessage}
					onChange={(event) => setInputMessage(event.target.value)}
				/>

				<button
					type="submit"
					className="w-1/4 rounded-md bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
				>
					Send
				</button>
			</form>
		</main>
	);
};

export default ChatRoom;
