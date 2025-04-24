import Message from '../models/MessageModel.js'



// Post a new message to a room
export const postMessage = async (req, res) => {
  const { room, sender, content } = req.body

  if (!room || !sender || !content) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const newMessage = await Message.create({ room, sender, content })
    res.status(201).json(newMessage)
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' })
  }
}

export const getMessagesByRoom = async (req, res) => {
  try {
    const msgs = await Message.find({ roomId: req.params.roomId })
      .sort('createdAt')
      .populate({
        path: 'user',
        select: 'name avatar',
        populate: { path: 'avatar', select: 'url' }
      });

    // map to a simpler shape
    const formatted = msgs.map(m => ({
      _id:       m._id,
      text:      m.text,
      createdAt: m.createdAt,
      username:  m.user.name,
      avatarUrl: m.user.avatar?.url
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
