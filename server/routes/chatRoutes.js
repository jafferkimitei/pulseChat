import express from 'express'
import { getMessagesByRoom, postMessage } from '../controllers/chatController.js'

const router = express.Router()

router.get('/:room', getMessagesByRoom)
router.post('/', postMessage)

// GET messages for a room, populated with user → avatar
router.get('/:roomId/messages', getMessagesByRoom);

export default router
