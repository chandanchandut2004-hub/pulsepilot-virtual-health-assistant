import { db, migrate } from '../src/db.js';
import dayjs from 'dayjs';

migrate();

const now = dayjs();
const samples = [
  { ts: now.subtract(2, 'hour').toISOString(), steps: 3200, calories: 1800, heartRate: 78 },
  { ts: now.subtract(1, 'hour').toISOString(), steps: 6400, calories: 1950, heartRate: 88 },
  { ts: now.toISOString(), steps: 9200, calories: 2100, heartRate: 92 },
];

const insert = db.prepare('INSERT INTO metrics (ts, steps, calories, heartRate) VALUES (?, ?, ?, ?)');
for (const s of samples) insert.run(s.ts, s.steps, s.calories, s.heartRate);

console.log('Seeded mock metrics.');
