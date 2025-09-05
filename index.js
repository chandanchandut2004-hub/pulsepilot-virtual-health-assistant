const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('✅ PulsePilot MCP Server is running on Render!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
