const express = require("express");
const bodyParser = require("body-parser");
const promptRoutes = require("./routes/promptRoutes");

const app = express();
app.use(bodyParser.json());

// Mount all routes under /api
app.use("/api", promptRoutes);

// Debug route
app.get("/test", (req, res) => {
  res.send("✅ API is working");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});