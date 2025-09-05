import { create } from 'zustand';
import axios from 'axios';

type Metric = { id?: number; ts: string; steps: number; calories: number; heartRate: number };
type Insight = { title: string; detail: string; action?: string };

type State = {
  metric: Metric | null;
  insights: Insight[];
  refresh: () => Promise<void>;
  syncWearable: () => Promise<void>;
};

export const useApp = create<State>((set, get) => ({
  metric: null,
  insights: [],
  refresh: async () => {
    const m = await axios.get('/api/metrics/latest');
    set({ metric: m.data.data });
    const i = await axios.get('/api/insights/today');
    set({ insights: i.data.data });
  },
  syncWearable: async () => {
    await axios.post('/api/wearable/sync', {});
    await get().refresh();
  },
}));
