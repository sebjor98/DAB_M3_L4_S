const { createClient } = require("redis");
const redisClient = createClient({
  url: "rediss://default:AVNS_av0itRRS1RsyUToB1Mk@caching-17c8a23e-sebastian-c368.c.aivencloud.com:14582",
});
redisClient.connect().catch(console.error);

module.exports = redisClient;
