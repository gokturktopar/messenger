module.exports = {
  baseURL: "http://localhost:3000",
  database: {
    uri: process.env.MONGO_URL + "/messager?retryWrites=true&w=majority",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  },
  redis: {
    uri: "redis",
    sessionKey: "thisIsSessionKey",
  },
  apiSecretKey: "thisIsApiSecretKey",
  tokenExpirePeriod: "24h",
};
