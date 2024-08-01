const { createClient } = require("redis");
const client = createClient();

function connectRedis() {
  client.connect().catch(console.error);
}

function getRedisClient(){
  return client;
}

module.exports = {connectRedis , getRedisClient};
