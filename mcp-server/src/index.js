import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";

const app = express();

// MCP endpoint for Smithery
app.get("/mcp", (req, res) => {
  res.send("MCP Server Running");
});

// Read Render's assigned port or fallback for local testing
const PORT = process.env.PORT || 7333;

// Create HTTP server
const server = createServer(app);

// Setup WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected via WebSocket");

  ws.on("message", (msg) => {
    console.log(`Received: ${msg}`);
    // Optional: echo back the message
    ws.send(`Server received: ${msg}`);
  });

  ws.send("Welcome to PulsePilot MCP server!");
});

// Start server on all interfaces
server.listen(PORT, "0.0.0.0", () => {
  console.log(`PulsePilot MCP server running at https://localhost:${PORT}/mcp`);
});
