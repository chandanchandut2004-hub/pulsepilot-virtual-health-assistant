<<<<<<< HEAD
# PulsePilot — Virtual Health Assistant

A tool that assists users in managing their health and wellness by integrating with wearable devices, collecting health metrics, and providing actionable insights.

> ⚠️ Health disclaimer: PulsePilot is for wellness education and habit-building, **not** a medical device. It does not diagnose, treat, or prevent disease. Always consult a qualified clinician for medical concerns.

## Team
- **Team name:** _Your Team_
- **Members:** _Name 1_, _Name 2_, _Name 3_

## Hackathon Theme / Challenge
- **Theme 2** (MCP: Model Context Protocol) — includes a hosted MCP server.
- Also maps to the general **Virtual Health Assistant** challenge.

## What we built
PulsePilot aggregates metrics (steps, calories, heart rate) from wearables or mock adapters, produces daily insights (e.g., recovery-aware suggestions), and sends reminders for medication and hydration. It includes:
- **Client (React + Vite + TypeScript):** dashboard, charts, insights, reminders.
- **Server (Node + Express + TypeScript):** REST API, SQLite storage, adapters for wearables, rules engine for insights, notification scheduler.
- **MCP Server (Theme 2):** exposes tools (`getMetrics`, `suggestWorkout`, `setReminder`) so compatible MCP clients/agents can reason over user health data.
- **Mock wearable adapter:** lets judges run the app without a physical device.

## How to run

### 0) Prereqs
- Node 18+ and pnpm (or npm/yarn). SQLite is embedded (no external DB).
- (Optional) For MCP: any MCP-compatible client. For Theme 2, host via Smithery.
=======
# PulsePilot — Virtual Health Assistant  

A tool that assists users in managing their health and wellness by integrating with wearable devices, collecting health metrics, and providing actionable insights.

⚠️ **Health disclaimer**: PulsePilot is for wellness education and habit-building, not a medical device. It does not diagnose, treat, or prevent disease. Always consult a qualified clinician for medical concerns.

---

## Team
- **Team name:** Solo Innovator  
- **Member:** Chandan  

---

## Hackathon Theme / Challenge
- Theme 2 (MCP: Model Context Protocol) — includes a hosted MCP server.  
- Also maps to the general Virtual Health Assistant challenge.

---

## What we built
PulsePilot aggregates metrics (steps, calories, heart rate) from wearables or mock adapters, produces daily insights (e.g., recovery-aware suggestions), and sends reminders for medication and hydration. It includes:

- **Client (React + Vite + TypeScript):** dashboard, charts, insights, reminders.
- **Server (Node + Express + TypeScript):** REST API, SQLite storage, adapters for wearables, rules engine for insights, notification scheduler.
- **MCP Server (Theme 2):** exposes tools (getMetrics, suggestWorkout, setReminder) so compatible MCP clients/agents can reason over user health data.
- **Mock wearable adapter:** lets judges run the app without a physical device.

---

## How to run

### 0) Prereqs
Node 18+ and pnpm (or npm/yarn). SQLite is embedded (no external DB).  
(Optional) For MCP: any MCP-compatible client. For Theme 2, host via Smithery.
>>>>>>> c487ee42881640528d907991c9627b43760fe267

### 1) Install
```bash
pnpm -v || npm -v
cd server && pnpm i || npm i
cd ../client && pnpm i || npm i
cd ../mcp-server && pnpm i || npm i
<<<<<<< HEAD
```

### 2) Seed mock data & start backend
```bash
=======
2) Seed mock data & start backend
>>>>>>> c487ee42881640528d907991c9627b43760fe267
cd server
pnpm run seed || npm run seed
pnpm run dev || npm run dev
# Server runs on http://localhost:4000
<<<<<<< HEAD
```

### 3) Start client
```bash
cd ../client
pnpm run dev || npm run dev
# App runs on http://localhost:5173
```

### 4) (Theme 2) Run MCP server locally
```bash
cd ../mcp-server
pnpm run dev || npm run dev
# MCP server starts on ws://localhost:7333 by default
```

## Tech Stack
- **Frontend:** React (Vite, TypeScript), Zustand state, Recharts for charts
- **Backend:** Node, Express, TypeScript, better-sqlite3, Zod
- **MCP:** TypeScript reference server exposing health tools
- **DevX:** pnpm (optional), nodemon/ts-node, ESLint/Prettier

## Required Tech Usage
- **Recorded demo:** max 5 minutes. _Add your public video link below._
- **Public GitHub repo:** this README is ready to push.
- **Smithery MCP host (Theme 2):** see below.

## Demo video
- **YouTube/Vimeo link:** _add here_

## Smithery link for MCP server (Theme 2)
1. Deploy `mcp-server` to a public host (or use Smithery's one-click form).
2. Open: https://smithery.ai/new
3. Provide:
   - **Name:** PulsePilot MCP
   - **Server URL:** your deployed websocket URL (e.g., `wss://your-domain/mcp`)
   - **Protocol:** MCP
   - **Brief description:** Exposes health metrics and wellness tools
4. Publish and paste the generated **Smithery link** here:
   - **Smithery link:** _add here_

## API Overview (server)
- `GET /api/metrics/latest` → recent steps, calories, heart rate
- `GET /api/insights/today` → rules-derived insights & suggested actions
- `POST /api/reminders` → create a reminder (`type`, `message`, `schedule`)
- `GET /api/reminders` → list reminders
- `POST /api/wearable/sync` → pull from adapters (mock by default)

## What we'd do with more time
- Direct Apple Health/Google Fit/Garmin integrations
- Sleep and HRV–aware recovery guidance
- Push notifications & calendar integration
- On-device inference for anomaly detection

## Submission checklist
- [ ] Recorded demo (≤ 5 min) uploaded & link added
- [ ] Public GitHub repo created from this code
- [ ] Smithery MCP server link added (Theme 2)
- [ ] Run instructions validated on a clean machine
- [ ] Submitted on HackerEarth by **Sep 9, 2025**

---

### Quick Start (one-liners)

```bash
# From repo root
(cd server && npm i && npm run seed && npm run dev) & (cd client && npm i && npm run dev) & (cd mcp-server && npm i && npm run dev)
```
=======

3) Start client
cd ../client
pnpm run dev || npm run dev
# App runs on http://localhost:5173

4) (Theme 2) Run MCP server locally
cd ../mcp-server
pnpm run dev || npm run dev
# MCP server starts on ws://localhost:7333 by default

Tech Stack

Frontend: React (Vite, TypeScript), Zustand state, Recharts for charts

Backend: Node, Express, TypeScript, better-sqlite3, Zod

MCP: TypeScript reference server exposing health tools

DevX: pnpm (optional), nodemon/ts-node, ESLint/Prettier

Required Tech Usage

Recorded demo: max 5 minutes. Add your public video link below.

Public GitHub repo: this README is ready to push.

Smithery MCP host (Theme 2): see below.

Demo video

YouTube/Vimeo link: add here after upload

Smithery link for MCP server (Theme 2)

Deploy mcp-server to a public host (or use Smithery's one-click form).
Open: https://smithery.ai/new

Provide:

Name: PulsePilot MCP

Server URL: your deployed websocket URL (e.g., wss://your-domain/mcp)

Protocol: MCP

Brief description: Exposes health metrics and wellness tools

Publish and paste the generated Smithery link here:

Smithery link: add here after publishing

API Overview (server)

GET /api/metrics/latest → recent steps, calories, heart rate

GET /api/insights/today → rules-derived insights & suggested actions

POST /api/reminders → create a reminder (type, message, schedule)

GET /api/reminders → list reminders

POST /api/wearable/sync → pull from adapters (mock by default)

What I'd do with more time

Direct Apple Health/Google Fit/Garmin integrations

Sleep and HRV–aware recovery guidance

Push notifications & calendar integration

On-device inference for anomaly detection

Submission checklist

 Recorded demo (≤ 5 min) uploaded & link added

 Public GitHub repo created from this code

 Smithery MCP server link added (Theme 2)

 Run instructions validated on a clean machine

 Submitted on HackerEarth by Sep 9, 2025

Quick Start (one-liners)
# From repo root
(cd server && npm i && npm run seed && npm run dev) & \
(cd client && npm i && npm run dev) & \
(cd mcp-server && npm i && npm run dev)


>>>>>>> c487ee42881640528d907991c9627b43760fe267
