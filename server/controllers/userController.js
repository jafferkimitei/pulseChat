import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getProfile = (req, res) => {
    res.status(200).json(req.user); 
};

export const updateProfile = async (req, res) => {
    const { name, email, avatar, oldPassword, newPassword } = req.body;
    
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (avatar) user.avatar = avatar;

        if (oldPassword || newPassword) {
            if (!oldPassword || !newPassword) {
                return res.status(400).json({ message: 'Both old and new passwords are required' });
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Old password is incorrect' });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        
        await user.save();

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ message: 'Profile updated', user, token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
