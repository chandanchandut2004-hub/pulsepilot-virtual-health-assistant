// Mock adapter that simulates data from a wearable.
import dayjs from 'dayjs';

export type Metric = { ts: string; steps: number; calories: number; heartRate: number };

export function fetchLatest(): Metric {
  const now = dayjs();
  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  return {
    ts: now.toISOString(),
    steps: random(3000, 12000),
    calories: random(1500, 2800),
    heartRate: random(55, 110),
  };
}
