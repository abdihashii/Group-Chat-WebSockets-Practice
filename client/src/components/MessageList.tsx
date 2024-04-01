import { TMessage } from "../types";

const MessageList = ({ messages }: { messages: TMessage[] }) => {
  return (
    <section className="flex w-full max-w-md flex-col gap-5 overflow-y-auto">
      {messages.map((message) => (
        <p
          key={message.id}
          className="w-full bg-white p-4 text-gray-800 shadow-md"
        >
          {message.content}
        </p>
      ))}
    </section>
  );
};

export default MessageList;
