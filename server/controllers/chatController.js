// const ChatMessage = require('../models/ChatMessage');
// const jwt = require('jsonwebtoken');

// const getMessages = async (req, res) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         const messages = await ChatMessage.find({
//             $or: [
//                 { sender: decoded.userId },
//                 { receiver: decoded.userId }
//             ]
//         }).sort({ createdAt: 1 });

//         res.json({ messages });
//     } catch (error) {
//         console.error('Error fetching messages:', error);
//         res.status(500).json({
//             error: 'Internal server error',
//             details: error.message
//         });
//     }
// };

// // Add more controller methods as needed
// const markAsRead = async (req, res) => {
//     // Implementation for marking messages as read
// };

// const deleteMessage = async (req, res) => {
//     // Implementation for deleting messages
// };

// module.exports = { getMessages, markAsRead, deleteMessage }




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