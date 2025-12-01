const setupRealTimeChat = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join room
    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      socket.emit('room-joined', { roomId, message: 'You joined the room' });
    });

    // Send message
    socket.on('send-message', (data) => {
      const { roomId, senderId, message, senderName } = data;
      io.to(roomId).emit('receive-message', {
        senderId,
        senderName,
        message,
        timestamp: new Date().toISOString()
      });
    });

    // Leave room
    socket.on('leave-room', (roomId) => {
      socket.leave(roomId);
      io.to(roomId).emit('user-left', { message: 'User left the chat' });
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = { setupRealTimeChat };
