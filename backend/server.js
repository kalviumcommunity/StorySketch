const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // ✅ Import CORS
const promptRoutes = require("./routes/promptRoutes");

const app = express();

// Allow any localhost port for development
app.use(cors({
  origin: /localhost:\d+/  // ✅ Regex to match any localhost port
}));

app.use(bodyParser.json());

// Mount routes
app.use("/api", promptRoutes);

// Test route
app.get("/test", (req, res) => {
  res.send("✅ API is working");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
