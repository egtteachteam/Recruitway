require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

// Database Connection
const connectDB = require('./config/database');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const companyRouter = require('./routes/companyRoutes');
const intervieweeRouter = require('./routes/intervieweeRoutes');
const interviewerRouter = require('./routes/interviewerRoutes');
const superAdmminRouter = require('./routes/superadminRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const chatRoutes = require('./routes/chatRoutes');
const zoomRouter = require('./routes/zoomRoutes');

// Socket Handlers
const socketHandlers = require('./socket/handlers');
const socketAuth = require('./socket/auth');

const app = express();
const server = http.createServer(app);

const corsOption = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOption));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/company', companyRouter);
app.use('/api/v1/candidate', intervieweeRouter);
app.use('/api/v1/interviewer', interviewerRouter);
app.use('/api/v1/superadmin', superAdmminRouter);
app.use('/api/v1/interviews', interviewRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/zoom', zoomRouter);

// Socket.io Setup
const io = socketIo(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Apply socket authentication middleware
io.use(socketAuth);

// Handle socket connections
io.on('connection', (socket) => socketHandlers(io, socket));

// Connect to Database and Start Server
const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 4000;

        // Use server.listen() instead of app.listen() since we're using Socket.IO
        server.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
            console.log(`✅ Socket.IO server ready`);
        });
    } catch (err) {
        console.error(`MongoDB Connection Failed: ${err.message}`);
        process.exit(1);
    }
};

startServer();
