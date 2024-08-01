const express = require("express");
const app = express();

const { connectRedis } = require("./middleware/connect_redis");
const connectToDatabase = require("./middleware/connect_db");

// routes
const studentRoutes = require("./routes/student_routes");
// connect to redis server
connectRedis();

// connect to mongodb database
connectToDatabase();

// middleware for parsing JSON request bodies
app.use(express.json());
app.use("/api/student", studentRoutes);

// entry point
app.get("/", (_req, res) => {
  res.send("Hello, World!");
});

// start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
