const express = require('express');
const chatRoutes = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const { getChatHistory, markAsRead, deleteMessage } = require('../controllers/chatController');

chatRoutes.use(authMiddleware);

chatRoutes.get('/:otherUserId', getChatHistory);
chatRoutes.post('/mark-as-read', markAsRead);
chatRoutes.delete('/:messageId', deleteMessage);

module.exports = chatRoutes;