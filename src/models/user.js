const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
      maxLength: 20,
    },
    password: {
      type: String,
      required: true,
    },
    blocked_users: [
      {
        type: String,
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
