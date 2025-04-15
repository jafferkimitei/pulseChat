import express from 'express'
import { getMessagesByRoom, postMessage } from '../controllers/chatController.js'

const router = express.Router()

router.get('/:room', getMessagesByRoom)
router.post('/', postMessage)

export default router
