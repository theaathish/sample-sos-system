const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const port = 3000;

app.use(express.json());

let alerts = [];

// Endpoint to receive SOS from the app
app.post('/sos', (req, res) => {
  const { latitude, longitude, deviceInfo } = req.body;

  const newAlert = {
    latitude,
    longitude,
    deviceInfo,
    timestamp: new Date(),
  };

  alerts.push(newAlert);

  // Notify connected clients via Socket.IO
  io.emit('newAlert', newAlert);

  res.status(200).send('SOS received');
});

// Serve the frontend webpage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.emit('initialAlerts', alerts); // Send initial data to the client when they connect
});

server.listen(port, () => {
  console.log(`Server is running on localhost or serverhost:${port}`);
});
