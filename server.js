const express = require("express");
const path = require("path");
const app = express();
const port = 8080; // You can choose any available port

app.use(express.static(path.join(__dirname, "public"))); // Serve static files from 'public' directory

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
