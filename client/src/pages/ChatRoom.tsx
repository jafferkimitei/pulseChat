import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getMessagesForRoom } from '../services/chatApi';

type Msg = {
  _id: string;
  text: string;
  createdAt: string;
  username: string;
  avatarUrl?: string;
};

const ChatRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<Msg[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roomId) return;
    getMessagesForRoom(roomId).then(setMessages);
  }, [roomId]);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 bg-gray-200">
        <h2 className="text-xl font-semibold">Room: {roomId}</h2>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg._id} className="flex items-start space-x-3">
            <img
              src={msg.avatarUrl ?? '/default-avatar.png'}
              alt={msg.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-bold">{msg.username}</p>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      {/* message input / send button goes here */}
    </div>
  );
};

export default ChatRoom;
