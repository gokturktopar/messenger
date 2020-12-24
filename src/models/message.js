const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema(
  {
    sender_username: {
      type: "string",
      required: true,
    },
    receiver_username: {
      type: "string",
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    message: {
      type: String,
      maxLength: 150
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Message", messageSchema);
