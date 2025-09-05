// Minimal MCP-like websocket server exposing health tools.
// This is a simplified reference; integrate with your agent/client as needed.

import { WebSocketServer } from 'ws';
import { z } from 'zod';

const PORT = Number(process.env.MCP_PORT || 7333);
const wss = new WebSocketServer({ port: PORT });

type RpcReq = { id: string | number; method: string; params?: any };
type RpcRes = { id: string | number; result?: any; error?: { code: number; message: string } };

const GetMetricsParams = z.object({});
const SuggestWorkoutParams = z.object({ steps: z.number().int().nonnegative(), heartRate: z.number().int().positive() });
const SetReminderParams = z.object({ type: z.enum(['hydration','medication','general']), message: z.string().min(1) });

wss.on('connection', (ws) => {
  ws.on('message', (buf) => {
    let msg: RpcReq;
    try { msg = JSON.parse(buf.toString()); }
    catch { return ws.send(JSON.stringify({ id: null, error: { code: -32700, message: 'Parse error' }})); }

    const respond = (res: RpcRes) => ws.send(JSON.stringify(res));

    (async () => {
      try {
        switch (msg.method) {
          case 'getMetrics': {
            GetMetricsParams.parse(msg.params || {});
            // return mock metrics (replace with DB call or HTTP to server)
            const data = { steps: 9300, calories: 2100, heartRate: 88, ts: new Date().toISOString() };
            return respond({ id: msg.id, result: data });
          }
          case 'suggestWorkout': {
            const p = SuggestWorkoutParams.parse(msg.params);
            const easy = p.steps < 5000 || p.heartRate > 95;
            const plan = easy
              ? '10-min mobility + light walk'
              : '20-min interval walk/jog + core (planks x3)';
            return respond({ id: msg.id, result: { plan } });
          }
          case 'setReminder': {
            const p = SetReminderParams.parse(msg.params);
            // In a full build, forward to backend /api/reminders
            return respond({ id: msg.id, result: { ok: true, echo: p } });
          }
          default:
            return respond({ id: msg.id, error: { code: -32601, message: 'Method not found' } });
        }
      } catch (e: any) {
        return respond({ id: msg.id, error: { code: -32602, message: e?.message || 'Invalid params' } });
      }
    })();
  });
});

console.log(`PulsePilot MCP server listening on ws://localhost:${PORT}`);
