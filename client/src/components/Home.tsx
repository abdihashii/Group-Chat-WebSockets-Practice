import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [chatRoomId, setChatRoomId] = useState("");

  const handleJoinChatRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedChatRoomId = chatRoomId.trim();

    if (chatRoomId.trim() === "") {
      alert("Please enter a chat room id");
      return;
    }

    navigate(`/${trimmedChatRoomId}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 bg-gray-100 p-10">
      <h1 className="text-center text-4xl font-bold">Home</h1>

      <h2 className="text-center text-2xl font-semibold">
        Which Chat Room would you like to join?
      </h2>

      <form className="w-1/4 space-y-4" onSubmit={handleJoinChatRoom}>
        <section className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="chat-room-id">
            Chat Room ID
          </label>
          <input
            className="rounded-md border border-gray-300 p-2"
            type="text"
            id="chat-room-id"
            aria-label="Chat Room ID"
            placeholder="Enter the chat room id..."
            value={chatRoomId}
            onChange={(event) => setChatRoomId(event.target.value)}
          />
        </section>

        <button
          className="w-full rounded-md bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
          type="submit"
        >
          Join Chat Room
        </button>
      </form>
    </main>
  );
};

export default Home;
