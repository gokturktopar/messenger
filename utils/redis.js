const redis = require("redis");
const { redis: redisConfig } = require("@configs/default");
const redisClient = redis.createClient({ host: redisConfig.uri, port: 6379 });

redisClient.on("error", (err) => {
  console.log(JSON.stringify({ msg: "Redis error: ", data: err }));
});

module.exports = {
  client: redisClient,
  quit: (callback) => {
    redisClient.quit(callback);
  },
};
