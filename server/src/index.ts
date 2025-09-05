import express from 'express';
import cors from 'cors';
import { db, migrate } from './db.js';
import { fetchLatest } from './adapters/mockWearable.js';
import { deriveInsights } from './insights.js';
import dayjs from 'dayjs';
import cron from 'node-cron';
import { z } from 'zod';

const app = express();
app.use(cors());
app.use(express.json());

migrate();

app.get('/api/metrics/latest', (req, res) => {
  const row = db.prepare('SELECT * FROM metrics ORDER BY ts DESC LIMIT 1').get();
  if (!row) return res.json({ ok: true, data: null });
  res.json({ ok: true, data: row });
});

app.post('/api/wearable/sync', (req, res) => {
  const m = fetchLatest();
  db.prepare('INSERT INTO metrics (ts, steps, calories, heartRate) VALUES (?, ?, ?, ?)')
    .run(m.ts, m.steps, m.calories, m.heartRate);
  res.json({ ok: true, data: m });
});

app.get('/api/insights/today', (req, res) => {
  const row = db.prepare('SELECT * FROM metrics ORDER BY ts DESC LIMIT 1').get();
  if (!row) return res.json({ ok: true, data: [] });
  const insights = deriveInsights(row.steps, row.calories, row.heartRate);
  res.json({ ok: true, data: insights });
});

const ReminderSchema = z.object({
  type: z.enum(['hydration', 'medication', 'general']).default('general'),
  message: z.string().min(1),
  schedule: z.string().min(1) // cron string or ISO timestamp
});

app.post('/api/reminders', (req, res) => {
  const parse = ReminderSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ ok: false, error: parse.error.flatten() });

  const { type, message, schedule } = parse.data;
  db.prepare('INSERT INTO reminders (type, message, schedule, createdAt) VALUES (?, ?, ?, ?)')
    .run(type, message, schedule, dayjs().toISOString());
  res.json({ ok: true });
});

app.get('/api/reminders', (req, res) => {
  const rows = db.prepare('SELECT * FROM reminders ORDER BY createdAt DESC').all();
  res.json({ ok: true, data: rows });
});

// Very lightweight scheduler: logs reminders (extend to push/email in real app)
cron.schedule('*/1 * * * *', () => {
  const rows = db.prepare('SELECT * FROM reminders').all();
  const now = dayjs();
  for (const r of rows) {
    // if schedule is cron-like we just log each minute; ISO timestamps trigger within ±30s
    if (r.schedule.includes(' ')) {
      console.log(`[REMINDER cron] ${r.type}: ${r.message}`);
    } else {
      const ts = dayjs(r.schedule);
      if (Math.abs(ts.diff(now, 'second')) <= 30) {
        console.log(`[REMINDER one-time] ${r.type}: ${r.message}`);
      }
    }
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`PulsePilot server listening on http://localhost:${PORT}`);
});
