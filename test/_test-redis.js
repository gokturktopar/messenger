const redis = require("redis-mock"),
  redisClient = redis.createClient();

redisClient.on("error", (err) => {
  console.log(JSON.stringify({ msg: "Redis error: ", data: err }));
});

module.exports = {
  client: redisClient,
  quit: (callback) => {
    redisClient.quit(callback);
  },
};
