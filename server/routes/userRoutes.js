import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { getProfile, updateProfile } from '../controllers/userController.js'

const router = express.Router()

router.route('/profile')
    .get(protect, getProfile)
    .put(protect, updateProfile);


export default router