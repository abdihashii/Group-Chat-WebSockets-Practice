import { TMessage } from '../types';

const MessageList = ({ messages }: { messages: TMessage[] }) => {
	return (
		<section className="flex w-full max-w-md flex-col gap-5 overflow-y-auto">
			{messages.map((message) => (
				<div
					key={message.id}
					className="flex flex-row gap-2 w-full bg-white p-4 text-gray-800 shadow-md"
				>
					<p className="font-bold">{message.user}:</p>
					<p className="">{message.content}</p>
				</div>
			))}
		</section>
	);
};

export default MessageList;
