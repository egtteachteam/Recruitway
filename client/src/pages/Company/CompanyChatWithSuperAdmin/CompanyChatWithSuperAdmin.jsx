// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import { useAuthContext } from '../../../context/auth-context';

// const CompanyChatWithSuperAdmin = () => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [isTyping, setIsTyping] = useState(false);
//     const [onlineStatus, setOnlineStatus] = useState('Connecting...');
//     const messagesEndRef = useRef(null);
//     const socketRef = useRef();
//     const {server} = useAuthContext()

//     useEffect(() => {
//         // Initialize socket connection
//         socketRef.current = io(server, {
//             withCredentials: true,
//             auth: {
//                 token: localStorage.getItem('token')
//             }
//         });

//         // Load previous messages
//         fetchMessages();

//         // Socket event listeners
//         socketRef.current.on('connect', () => {
//             setOnlineStatus('Online');
//         });

//         socketRef.current.on('disconnect', () => {
//             setOnlineStatus('Offline - Reconnecting...');
//         });

//         socketRef.current.on('newMessage', (message) => {
//             setMessages(prev => [...prev, message]);
//         });

//         socketRef.current.on('typing', (isTyping) => {
//             setIsTyping(isTyping);
//         });

//         return () => {
//             socketRef.current.disconnect();
//         };
//     }, []);

//     const fetchMessages = async () => {
//         try {
//             const response = await fetch(`${server}/api/chat/messages`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             const data = await response.json();
//             setMessages(data.messages);
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         }
//     };

//     const handleSendMessage = async () => {
//         if (newMessage.trim() === '') return;

//         const message = {
//             text: newMessage,
//             sender: 'user', // In real app, this would come from user auth
//             time: new Date().toISOString()
//         };

//         try {
//             // Emit message via socket
//             socketRef.current.emit('sendMessage', message);
//             setNewMessage('');
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };

//     const handleTyping = (e) => {
//         setNewMessage(e.target.value);
//         socketRef.current.emit('typing', e.target.value.length > 0);
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             handleSendMessage();
//         }
//     };

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     return (
//         <div className="container-fluid chat-container">
//             <div className="row h-100">
//                 <div className="col-md-8 col-lg-6 mx-auto d-flex flex-column h-100">
//                     {/* Chat Header */}
//                     <div className="chat-header bg-primary text-white p-3 d-flex align-items-center">
//                         <div className="user-avatar me-3">
//                             <div className="avatar-circle bg-light text-primary d-flex align-items-center justify-content-center">
//                                 <i className="ti ti-headset"></i>
//                             </div>
//                         </div>
//                         <div className="user-info flex-grow-1">
//                             <h5 className="mb-0">Support Team</h5>
//                             <div className="d-flex align-items-center">
//                                 <span className={`status-indicator ${onlineStatus === 'Online' ? 'online' : 'offline'}`}></span>
//                                 <small className="ms-2">
//                                     {onlineStatus}
//                                     {isTyping && <span className="ms-2 typing-indicator">typing...</span>}
//                                 </small>
//                             </div>
//                         </div>
//                         <div className="header-actions">
//                             <button className="btn btn-link text-white">
//                                 <i className="ti ti-info-circle"></i>
//                             </button>
//                         </div>
//                     </div>

//                     {/* Chat Messages */}
//                     <div className="chat-messages flex-grow-1 p-3 overflow-auto">
//                         {messages.length === 0 ? (
//                             <div className="text-center text-muted my-5">
//                                 <i className="ti ti-messages-off fs-1"></i>
//                                 <p>No messages yet. Start the conversation!</p>
//                             </div>
//                         ) : (
//                             messages.map((message, index) => (
//                                 <div
//                                     key={index}
//                                     className={`message-bubble mb-3 ${message.sender === 'user' ? 'user-message' : 'admin-message'}`}
//                                 >
//                                     <div className="message-content">
//                                         <div className="message-text">{message.text}</div>
//                                         <div className="message-meta d-flex justify-content-end align-items-center mt-1">
//                                             <small className="text-muted me-2">
//                                                 {new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                             </small>
//                                             {message.sender === 'user' && (
//                                                 <i className={`ti ${message.status === 'read' ? 'ti-checks text-primary' : 'ti-check text-muted'}`}></i>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                         <div ref={messagesEndRef} />
//                     </div>

//                     {/* Message Input */}
//                     <div className="message-input bg-light p-3 border-top">
//                         <div className="input-group">
//                             <button className="btn btn-outline-secondary" type="button">
//                                 <i className="ti ti-paperclip"></i>
//                             </button>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Type your message..."
//                                 value={newMessage}
//                                 onChange={handleTyping}
//                                 onKeyPress={handleKeyPress}
//                             />
//                             <button
//                                 className="btn btn-primary"
//                                 type="button"
//                                 onClick={handleSendMessage}
//                                 disabled={!newMessage.trim()}
//                             >
//                                 <i className="ti ti-send"></i>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CompanyChatWithSuperAdmin;





// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import { useAuthContext } from '../../../context/auth-context';

// const CompanyChatWithSuperAdmin = () => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [isTyping, setIsTyping] = useState(false);
//     const [socket, setSocket] = useState(null);
//     const messagesEndRef = useRef(null);
//     const { server, superAdmin: otherUser, user: currentUser } = useAuthContext()

//     useEffect(() => {
//         if (!otherUser?._id) return;

//         try {
//             const newSocket = io(server, {
//                 auth: { token: localStorage.getItem('token') }
//             });

//             setSocket(newSocket);
//             fetchChatHistory();

//             return () => {
//                 newSocket.disconnect();
//             };
//         } catch (error) {
//             console.error("Socket connection error:", error);
//         }
//     }, [otherUser?._id]);


//     useEffect(() => {
//         if (!socket) return;

//         socket.on('newMessage', (message) => {
//             setMessages(prev => [...prev, message]);
//             if (message.sender._id !== currentUser._id) {
//                 markAsRead([message._id]);
//             }
//         });

//         socket.on('typing', ({ senderId, isTyping }) => {
//             if (senderId === otherUser._id) {
//                 setIsTyping(isTyping);
//             }
//         });

//         socket.on('messagesRead', ({ messageIds }) => {
//             setMessages(prev => prev.map(msg =>
//                 messageIds.includes(msg._id) ? { ...msg, status: 'read' } : msg
//             ));
//         });

//     }, [socket]);

//     const fetchChatHistory = async () => {
//         try {
//             const response = await fetch(`${server}/api/chat/${otherUser._id}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             const data = await response.json();
//             setMessages(data);
//         } catch (error) {
//             console.error('Error fetching chat history:', error);
//         }
//     };

//     const markAsRead = async (messageIds) => {
//         try {
//             await fetch(`${server}/api/chat/mark-as-read`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 },
//                 body: JSON.stringify({ messageIds })
//             });
//             socket.emit('markAsRead', { messageIds, senderId: currentUser._id });
//         } catch (error) {
//             console.error('Error marking messages as read:', error);
//         }
//     };

//     const deleteMessage = async (messageId) => {
//         try {
//             await fetch(`${server}/api/chat/${messageId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             setMessages(prev => prev.filter(msg => msg._id !== messageId));
//         } catch (error) {
//             console.error('Error deleting message:', error);
//         }
//     };

//     const handleSendMessage = () => {
//         if (newMessage.trim() === '') return;

//         socket.emit('sendMessage', {
//             text: newMessage,
//             receiverId: otherUser._id
//         });
//         setNewMessage('');
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             handleSendMessage();
//         }
//     };

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     return (
//         <div className="chat-container">
//             <div className="chat-header">
//                 {/* <h5>{otherUser.name}</h5> */}
//                 <small>{isTyping ? 'typing...' : 'online'}</small>
//             </div>

//             <div className="chat-messages">
//                 {messages.length === 0 ? (
//                     <div className="empty-chat">
//                         {/* <TiMessages size={48} /> */}
//                         <i className="ti ti-message"></i>
//                         <p>No messages yet. Start the conversation!</p>
//                     </div>
//                 ) : (
//                     messages.map((message) => (
//                         <div
//                             key={message._id}
//                             className={`message ${message.sender._id === currentUser._id ? 'sent' : 'received'}`}
//                         >
//                             <div className="message-content">
//                                 <p>{message.text}</p>
//                                 <div className="message-meta">
//                                     <small>
//                                         {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                     </small>
//                                     {message.sender._id === currentUser._id && (
//                                         <span className="status-icon">
//                                             {message.status === 'read' ? <i className="ti ti-check"></i> : <i className="ti ti-circle-check"></i>}
//                                         </span>
//                                     )}
//                                 </div>
//                             </div>
//                             {message.sender._id === currentUser._id && (
//                                 <button
//                                     className="delete-btn"
//                                     onClick={() => deleteMessage(message._id)}
//                                 >
//                                     <i className="ti ti-user-off"></i>
//                                 </button>
//                             )}
//                         </div>
//                     ))
//                 )}
//                 <div ref={messagesEndRef} />
//             </div>

//             <div className="message-input">
//                 <button className="btn-icon">
//                     <i className="ti ti-paperclip"></i>
//                 </button>
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => {
//                         setNewMessage(e.target.value);
//                         socket.emit('typing', {
//                             receiverId: otherUser._id,
//                             isTyping: e.target.value.length > 0
//                         });
//                     }}
//                     onKeyPress={handleKeyPress}
//                     placeholder="Type a message..."
//                 />
//                 {newMessage ? (
//                     <button className="btn-icon primary" onClick={handleSendMessage}>
//                         <i className="ti ti-send"></i>
//                     </button>
//                 ) : (
//                     <button className="btn-icon">
//                         <i className="ti ti-microphone"></i>
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CompanyChatWithSuperAdmin;




import React, { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import { useAuthContext } from '../../../context/auth-context';

const CompanyChatWithSuperAdmin = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [socket, setSocket] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const { server, superAdmin: otherUser, user: currentUser } = useAuthContext();

    // Fetch chat history
    const fetchChatHistory = useCallback(async () => {
        if (!otherUser?._id) return;

        try {
            const response = await fetch(`${server}/api/v1/chat/${otherUser._id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch chat history');
            }

            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    }, [server, otherUser]);

    // Mark messages as read
    const markAsRead = useCallback(async (messageIds) => {
        if (!socket || !messageIds.length) return;

        try {
            const response = await fetch(`${server}/api/v1/chat/mark-as-read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ messageIds })
            });

            if (!response.ok) {
                throw new Error('Failed to mark messages as read');
            }

            socket.emit('markAsRead', {
                messageIds,
                senderId: currentUser._id
            });
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    }, [socket, server, currentUser]);

    // Delete message
    const deleteMessage = useCallback(async (messageId) => {
        try {
            const response = await fetch(`${server}/api/v1/chat/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete message');
            }

            setMessages(prev => prev.filter(msg => msg._id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    }, [server]);

    // Handle sending messages
    const handleSendMessage = useCallback(() => {
        if (!newMessage.trim() || !socket) return;

        socket.emit('sendMessage', {
            text: newMessage,
            receiverId: otherUser._id
        });

        // Clear typing indicator
        socket.emit('typing', {
            receiverId: otherUser._id,
            isTyping: false
        });

        setNewMessage('');
        clearTimeout(typingTimeoutRef.current);
    }, [newMessage, socket, otherUser]);

    // Handle typing events with debounce
    const handleTyping = useCallback((e) => {
        setNewMessage(e.target.value);

        if (!socket) return;

        // Clear previous timeout
        clearTimeout(typingTimeoutRef.current);

        // Emit typing event
        socket.emit('typing', {
            receiverId: otherUser._id,
            isTyping: e.target.value.length > 0
        });

        // Set timeout to stop typing indicator after 2 seconds
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('typing', {
                receiverId: otherUser._id,
                isTyping: false
            });
        }, 2000);
    }, [socket, otherUser]);

    // Initialize socket connection
    useEffect(() => {
        if (!otherUser?._id) return;

        const newSocket = io(server, {
            auth: {
                token: localStorage.getItem('token')
            },
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        newSocket.on('connect', () => {
            setConnectionStatus('connected');
        });

        newSocket.on('disconnect', () => {
            setConnectionStatus('disconnected');
        });

        newSocket.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
            setConnectionStatus('error');
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
            clearTimeout(typingTimeoutRef.current);
        };
    }, [server, otherUser]);

    // Setup socket event listeners
    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (message) => {
            setMessages(prev => [...prev, message]);
            if (message.sender._id !== currentUser._id) {
                markAsRead([message._id]);
            }
        };

        const handleTypingEvent = ({ senderId, isTyping }) => {
            if (senderId === otherUser._id) {
                setIsTyping(isTyping);
            }
        };

        const handleMessagesRead = ({ messageIds }) => {
            setMessages(prev => prev.map(msg =>
                messageIds.includes(msg._id) ? { ...msg, status: 'read' } : msg
            ));
        };

        socket.on('newMessage', handleNewMessage);
        socket.on('typing', handleTypingEvent);
        socket.on('messagesRead', handleMessagesRead);

        return () => {
            socket.off('newMessage', handleNewMessage);
            socket.off('typing', handleTypingEvent);
            socket.off('messagesRead', handleMessagesRead);
        };
    }, [socket, currentUser, otherUser, markAsRead]);

    // Fetch chat history when user changes
    useEffect(() => {
        fetchChatHistory();
    }, [fetchChatHistory]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle sending message on Enter key
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!otherUser) {
        <div className="container-fluid">
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="text-center p-4 bg-white shadow rounded">
                    <i className="ti ti-user-off text-danger fs-1 mb-3"></i>
                    <h5 className="text-dark">No Super Admin Available</h5>
                    <p className="text-muted">Please try again later.</p>
                </div>
            </div>
        </div>
    }

    return (
        <div className="container-fluid">
            <div className="mx-auto p-4 border rounded shadow bg-white" style={{ maxWidth: '700px', height: '80vh', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                    <h5 className="mb-0 text-primary">💬 Chat with Super Admin</h5>
                    <div className="d-flex align-items-center gap-2">
                        <span
                            className={`badge rounded-circle ${connectionStatus === 'connected' ? 'bg-success' : 'bg-secondary'}`}
                            title={connectionStatus}
                            style={{ width: '10px', height: '10px' }}
                        ></span>
                        <small className={`text-${connectionStatus === 'connected' ? 'success' : 'secondary'}`}>
                            {isTyping ? 'typing...' : connectionStatus === 'connected' ? 'online' : 'offline'}
                        </small>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-grow-1 overflow-auto px-2 mb-3">
                    {messages.length === 0 ? (
                        <div className="text-center text-muted py-5">
                            <i className="ti ti-message-circle fs-1 text-primary mb-2"></i>
                            <p className="mb-0">No messages yet. Say hello 👋</p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div
                                key={message._id}
                                className={`d-flex mb-3 ${message.sender._id === currentUser._id ? 'justify-content-end' : 'justify-content-start'}`}
                            >
                                <div
                                    className={`p-3 rounded-3 shadow-sm ${message.sender._id === currentUser._id ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                                    style={{ maxWidth: '75%', position: 'relative' }}
                                >
                                    <p className="mb-2 text-break" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
                                    <div className="d-flex justify-content-between align-items-center small">
                                        <span className="text-muted">
                                            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        {message.sender._id === currentUser._id && (
                                            <span>
                                                {message.status === 'read' ? (
                                                    <i className="ti ti-checks text-white ms-2"></i>
                                                ) : (
                                                    <i className="ti ti-check text-white-50 ms-2"></i>
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    {message.sender._id === currentUser._id && (
                                        <button
                                            className="btn btn-sm btn-link text-white position-absolute top-0 end-0 mt-1 me-2"
                                            onClick={() => deleteMessage(message._id)}
                                            title="Delete"
                                        >
                                            <i className="ti ti-trash"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-top pt-3 d-flex align-items-center gap-2">
                    <input
                        type="text"
                        className="form-control"
                        value={newMessage}
                        onChange={handleTyping}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        disabled={connectionStatus !== 'connected'}
                    />

                    <button className="btn btn-primary rounded-circle" onClick={handleSendMessage} title="Send">
                        <i className="ti ti-send"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CompanyChatWithSuperAdmin;