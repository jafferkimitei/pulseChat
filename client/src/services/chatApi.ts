import axios from 'axios';

export const getMessagesForRoom = async (roomId: string) => {
  const { data } = await axios.get<{ _id: string; text: string; createdAt: string; username: string; avatarUrl?: string}[]>(
    `http://localhost:5000/api/chat/${roomId}/messages`
  );
  return data;
};
