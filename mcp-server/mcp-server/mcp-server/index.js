// Minimal HTTP + WebSocket server that serves / and /mcp,
// and upgrades /mcp to a WebSocket connection (for MCP clients).

const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();

// simple health root
app.get('/', (req, res) => {
  res.send('PulsePilot MCP HTTP server — root OK');
});

// human readable GET for /mcp (Smithery may call the HTTPS URL)
app.get('/mcp', (req, res) => {
  res.send('MCP endpoint — this URL accepts WebSocket upgrades at /mcp');
});

// create HTTP server and attach WS server (noServer mode)
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

// handle upgrade and only accept upgrades on /mcp
server.on('upgrade', (request, socket, head) => {
  if (request.url === '/mcp') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

// handle WS connections — implement minimal RPC-like handlers
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
          case 'getMetrics': {
            // mock metrics
            const data = {
              ts: new Date().toISOString(),
              steps: 8200,
              calories: 2000,
              heartRate: 84
            };
            return respond({ result: data });
          }
          case 'suggestWorkout': {
            const params = msg.params || {};
            const steps = Number(params.steps ?? 0);
            const hr = Number(params.heartRate ?? 0);
            const plan = (steps < 5000 || hr > 95)
              ? '10-min mobility + light walk'
              : '20-min interval walk/jog + core (planks x3)';
            return respond({ result: { plan } });
          }
          case 'setReminder': {
            const p = msg.params || {};
            console.log('setReminder called:', p);
            // echo back
            return respond({ result: { ok: true, echo: p }});
          }
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
