const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userLogSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    successful_logins: [
      {
        date: {
          type: Date,
        },
      },
    ],
    failed_logins: [
      {
        date: {
          type: Date,
        },
      },
    ],
    created_at:
      {
        type: Date,
        default: Date.now(),
      },
    
  },
  { versionKey: false }
);

module.exports = mongoose.model("UserLog", userLogSchema);
