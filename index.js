const express = require("express");
const axios = require("axios");

const { createClient } = require("redis");
const app = express();

const redisClient = createClient();

redisClient.connect().catch(console.error);

app.get("/", (_req, res) => {
  res.send("Hello, World!");
});

app.get("/users", async (_req, res) => {
  try {
    const cachedData = await redisClient.get("post");
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    await redisClient.set("post", JSON.stringify(data), { EX: 3600 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
