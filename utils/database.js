const mongoose = require("mongoose");
const { database } = require("@configs/default");
module.exports.connect = () => {
  mongoose.connect(database.uri, database.options).catch((err) => {
    console.log(err);
  });
  mongoose.connection.once("open", () => {
    console.log("MongoDB event open");
    console.log("MongoDB connected [%s]");

    mongoose.connection.on("connected", () => {
      console.log("MongoDB event connected");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB event disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB event reconnected");
    });

    mongoose.connection.on("error", (err) => {
      console.log(`MongoDB event error: ${err}`);
    });
  });
};
