import Message from '../models/Message.js'

// Get all messages for a specific room
export const getMessagesByRoom = async (req, res) => {
  const { room } = req.params
  try {
    const messages = await Message.find({ room }).sort({ createdAt: 1 })
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
}

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
