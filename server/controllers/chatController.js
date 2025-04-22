const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User');

const getChatHistory = async (req, res) => {
    try {
        const { userId } = req.user;
        const { otherUserId } = req.params;

        const messages = await ChatMessage.find({
            $or: [
                { sender: userId, receiver: otherUserId },
                { sender: otherUserId, receiver: userId }
            ],
            deletedFor: { $ne: userId }
        })
            .sort({ createdAt: 1 })
            .populate('sender receiver', 'name role');

        res.json(messages);
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const markAsRead = async (req, res) => {
    try {
        const { userId } = req.user;
        const { messageIds } = req.body;

        await ChatMessage.updateMany(
            {
                _id: { $in: messageIds },
                receiver: userId
            },
            { $set: { status: 'read' } }
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error marking messages as read:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { userId } = req.user;
        const { messageId } = req.params;

        await ChatMessage.findByIdAndUpdate(
            messageId,
            { $addToSet: { deletedFor: userId } }
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getChatHistory, markAsRead, deleteMessage }