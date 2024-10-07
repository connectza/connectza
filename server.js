const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http'); // Import http
const socketIo = require('socket.io'); // Import socket.io
const uploadRoutes = require('./routes/uploads'); // Import upload routes
const authRoutes = require('./routes/auth'); // Import auth routes
const postRoutes = require('./routes/posts'); // Ensure you have created this route

// Initialize the express app
const app = express(); 

// Load environment variables
dotenv.config();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Iheanacho:IHEANACHO%4099@connectza.peb14.mongodb.net/?retryWrites=true&w=majority&appName=connectza')
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error(err));

// Socket.io setup
const server = http.createServer(app); // Create server
const io = socketIo(server); // Initialize Socket.io

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message); // Emit the message to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Use routes
app.use('/api/uploads', uploadRoutes); // This should be after app is defined
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to CONNECTZA!');
});

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
