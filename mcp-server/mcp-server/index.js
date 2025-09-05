const WebSocket = require('ws');

const PORT = process.env.PORT || 7333;
const wss = new WebSocket.Server({ port: PORT });

console.log(`PulsePilot MCP server listening on ws://localhost:${PORT}`);

function send(ws, obj) {
  try { ws.send(JSON.stringify(obj)); } catch (e) { console.error('send error', e); }
}

wss.on('connection', function connection(ws) {
  console.log('client connected');

  ws.on('message', function message(data) {
    let msg;
    try { msg = JSON.parse(data); }
    catch (err) {
      return send(ws, { id: null, error: { code: -32700, message: 'Parse error' }});
    }

    const respond = (res) => {
      const out = Object.assign({ id: msg.id ?? null }, res);
      send(ws, out);
    };

    (async () => {
      try {
        switch (msg.method) {
          case 'getMetrics': {
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
            const params = msg.params || {};
            console.log('setReminder called:', params);
            return respond({ result: { ok: true, echo: params } });
          }
          default:
            return respond({ error: { code: -32601, message: 'Method not found' }});
        }
      } catch (err) {
        return respond({ error: { code: -32602, message: err.message || 'Invalid params' }});
      }
    })();
  });

  ws.on('close', () => console.log('client disconnected'));
});
