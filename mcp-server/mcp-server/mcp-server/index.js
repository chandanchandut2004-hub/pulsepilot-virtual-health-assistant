// Minimal HTTP + WebSocket MCP server
const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();

// Health check endpoint
app.get('/', (req, res) => {
  res.send('PulsePilot MCP HTTP server — root OK');
});

// Human-readable GET for /mcp
app.get('/mcp', (req, res) => {
  res.send('MCP endpoint — accepts WebSocket upgrades at /mcp');
});

// HTTP server + WS server
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  if (request.url === '/mcp') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

wss.on('connection', (ws) => {
  console.log('New MCP client connected');

  function send(obj) {
    try { ws.send(JSON.stringify(obj)); }
    catch (e) { console.error('send error', e); }
  }

  ws.on('message', (data) => {
    let msg;
    try { msg = JSON.parse(data.toString()); }
    catch (err) {
      return send({ id: null, error: { code: -32700, message: 'Parse error' }});
    }

    const respond = (payload) => send(Object.assign({ id: msg.id ?? null }, payload));

    (async () => {
      try {
        switch (msg.method) {
          case 'getMetrics':
            return respond({ result: { ts: new Date().toISOString(), steps: 8200, calories: 2000, heartRate: 84 } });
          case 'suggestWorkout':
            const steps = Number(msg.params?.steps ?? 0);
            const hr = Number(msg.params?.heartRate ?? 0);
            const plan = (steps < 5000 || hr > 95)
              ? '10-min mobility + light walk'
              : '20-min interval walk/jog + core (planks x3)';
            return respond({ result: { plan } });
          case 'setReminder':
            console.log('setReminder called:', msg.params);
            return respond({ result: { ok: true, echo: msg.params } });
          default:
            return respond({ error: { code: -32601, message: 'Method not found' }});
        }
      } catch (err) {
        return respond({ error: { code: -32602, message: err.message || 'Invalid params' }});
      }
    })();
  });

  ws.on('close', () => console.log('MCP client disconnected'));
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});

