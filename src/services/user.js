const userDatabaseHelper = require("@database-helpers/user");
const errors = require("@utils/error");

exports.getAll = async () => {
  try {
    return await userDatabaseHelper.getAll();
  } catch (e) {
    throw errors.BackendError(e);
  }
};
exports.getById = async (id) => {
  try {
    return await userDatabaseHelper.getById(id);
  } catch (e) {
    throw errors.BackendError(e);
  }
};
/**
 *
 * @param {Object} data
 * @param {string} data.blocker_username
 * @param {string} data.blocked_username
 */
exports.blockUser = async (data) => {
  try {
    //check blocked user is exist or not
    await userDatabaseHelper.getOne({username: data.blocked_username})

    const query = { $push: { blocked_users: data.blocked_username } }
    const filter = {username : data.blocker_username}
    return await userDatabaseHelper.updateOne(filter, query);
  } catch (e) {
    throw errors.BackendError(e);
  }
};

exports.deleteById = async (id) => {
  try {
    return await userDatabaseHelper.deleteById(id);
  } catch (e) {
    throw errors.BackendError(e);
  }
};
