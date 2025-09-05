const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server, path: '/mcp' });

wss.on('connection', (ws) => {
    console.log('New MCP client connected');
    ws.on('message', (message) => {
        console.log('Received:', message);
        ws.send(`Server received: ${message}`);
    });
    ws.on('close', () => console.log('Client disconnected'));
});

app.get('/', (req, res) => res.send('MCP Server is running'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
