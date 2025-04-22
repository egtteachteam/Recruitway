// const express = require('express');
// const chatRoutes = express.Router();
// const chatController = require('../controllers/chatController');
// const authMiddleware = require('../middleware/auth-middleware');

// // Apply authentication middleware to all routes
// chatRoutes.use(authMiddleware);

// chatRoutes.get('/messages', chatController.getMessages);
// // chatRoutes.patch('/messages/:id/read', chatController.markAsRead);
// // chatRoutes.delete('/messages/:id', chatController.deleteMessage);

// module.exports = chatRoutes;



const express = require('express');
const chatRoutes = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const { getChatHistory, markAsRead, deleteMessage } = require('../controllers/chatController');

chatRoutes.use(authMiddleware);

chatRoutes.get('/:otherUserId', getChatHistory);
chatRoutes.post('/mark-as-read', markAsRead);
chatRoutes.delete('/:messageId', deleteMessage);

module.exports = chatRoutes;