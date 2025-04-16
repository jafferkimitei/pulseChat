export const getAvatars = async (req, res) => {
    try {
        const avatars = await Avatar.find();
        res.status(200).json(avatars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};