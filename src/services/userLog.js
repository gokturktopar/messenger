const userLogDatabaseHelper = require("@database-helpers/userLog");
const errors = require("@utils/error");
const userDatabaseHelper = require("@database-helpers/user");

exports.getAll = async (username) => {
  try {
    const filter = { username };
    return await userLogDatabaseHelper.getOne(filter);
  } catch (e) {
    throw errors.BackendError(e);
  }
};
exports.addNewLog = async ({ username, logType, date }) => {
  try {
    //check user exist
    await userDatabaseHelper.getOne({username})
    const query = { $push: { [logType]: { date: Date(date) } } };
    const filter = { username };
    return await userLogDatabaseHelper.updateOne(filter, query);
  } catch (e) {
    console.log(e);
  }
};

exports.addCreatedAt = async ({ username, date }) => {
  try {
    const query = {created_at : date}
    const filter = { username };
    return await userLogDatabaseHelper.updateOne(filter, query);
  } catch (e) {
    console.log(e);
  }
};
