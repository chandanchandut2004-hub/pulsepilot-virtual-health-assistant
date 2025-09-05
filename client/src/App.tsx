import React, { useEffect } from 'react';
import { useApp } from './store';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

axios.defaults.baseURL = 'http://localhost:4000';

export default function App() {
  const { metric, insights, refresh, syncWearable } = useApp();
  useEffect(() => { refresh(); }, []);

  return (
    <div style={{ fontFamily: 'Inter, system-ui, Arial', padding: 24, maxWidth: 960, margin: '0 auto' }}>
      <h1>PulsePilot — Virtual Health Assistant</h1>
      <p>Track steps, calories, heart rate. Get simple, actionable insights and reminders.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
          <h3>Latest Metrics</h3>
          {metric ? (
            <ul>
              <li><strong>Time:</strong> {new Date(metric.ts).toLocaleString()}</li>
              <li><strong>Steps:</strong> {metric.steps}</li>
              <li><strong>Calories:</strong> {metric.calories}</li>
              <li><strong>Heart Rate:</strong> {metric.heartRate} bpm</li>
            </ul>
          ) : <p>No data yet.</p>}
          <button onClick={syncWearable}>Sync Wearable (Mock)</button>
        </div>

        <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
          <h3>Insights</h3>
          {insights.length === 0 && <p>No insights yet — sync data to generate.</p>}
          {insights.map((i, idx) => (
            <div key={idx} style={{ marginBottom: 12 }}>
              <strong>{i.title}</strong>
              <div>{i.detail}</div>
              {i.action && <em>Try: {i.action}</em>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16, marginTop: 16 }}>
        <h3>Heart Rate Trend (mock)</h3>
        <Chart />
      </div>
    </div>
  );
}

function Chart() {
  // simple mocked history for the chart
  const data = Array.from({ length: 12 }).map((_, i) => ({
    t: `${i}:00`,
    hr: Math.round(70 + Math.random() * 30)
  }));
  return (
    <LineChart width={860} height={260} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="t" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="hr" />
    </LineChart>
  );
}
