// const ChatMessage = require('../models/ChatMessage');

// const socketHandlers = (socket) => {
//     console.log(`User connected: ${socket.userId}`);

//     // Join user to their room
//     socket.join(socket.userId);

//     // Handle typing indicator
//     socket.on('typing', (isTyping) => {
//         socket.broadcast.emit('typing', isTyping);
//     });

//     // Handle new messages
//     socket.on('sendMessage', async ({ text, receiverId }) => {
//         try {
//             const message = new ChatMessage({
//                 sender: socket.userId,
//                 receiver: receiverId,
//                 text,
//                 status: 'delivered'
//             });

//             await message.save();

//             // Emit to sender
//             socket.emit('newMessage', message);

//             // Emit to receiver
//             socket.to(receiverId).emit('newMessage', message);

//         } catch (error) {
//             console.error('Error saving message:', error);
//         }
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log(`User disconnected: ${socket.userId}`);
//     });
// };

// module.exports = socketHandlers



const ChatMessage = require('../models/ChatMessage');

const socketHandlers = (io, socket) => {
    console.log(`User connected: ${socket.userId}`);

    // Join user to their room
    socket.join(socket.userId);

    // Handle typing indicator
    const a = socket.on('typing', ({ receiverId, isTyping }) => {
        socket.to(receiverId).emit('typing', { senderId: socket.userId, isTyping });
    });

    // Handle new messages
    socket.on('sendMessage', async ({ text, receiverId }) => {
        try {
            const message = new ChatMessage({
                sender: socket.userId,
                receiver: receiverId,
                text,
                status: 'delivered'
            });

            await message.save();

            const populatedMessage = await ChatMessage.populate(message, {
                path: 'sender receiver',
                select: 'name role'
            });

            // Emit to sender
            socket.emit('newMessage', populatedMessage);
            
            // Emit to receiver
            socket.to(receiverId).emit('newMessage', populatedMessage);

        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    // Handle message read
    socket.on('markAsRead', async ({ messageIds, senderId }) => {
        try {
            await ChatMessage.updateMany(
                {
                    _id: { $in: messageIds },
                    receiver: socket.userId
                },
                { $set: { status: 'read' } }
            );

            // Notify sender that messages were read
            socket.to(senderId).emit('messagesRead', { messageIds });

        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.userId}`);
    });
};

module.exports = socketHandlers