const messageDatabaseHelper = require("@database-helpers/message");
const userDatabaseHelper = require("@database-helpers/user");
const errors = require("@utils/error");
const queryParser = require("@utils/queryParser");

/**
 *
 * @param {Object} data
 * @param {string} data.sender_username
 * @param {string} data.receiver_username
 * @param {string} data.created_at
 * @param {string} data.message
 */
exports.post = async (data) => {
  try {
    //checking users exist
    await userDatabaseHelper.getOne({username: data.sender_username})
    const receiverUser = await userDatabaseHelper.getOne({username: data.receiver_username}, 'blocked_users')
    const isBlocked = receiverUser.blocked_users.find(blocked=> blocked == data.sender_username);
    if (isBlocked) {
      throw errors.BackendError({message:`You are blocked by ${data.receiver_username}!`});
    }
    return await messageDatabaseHelper.post(data);
  } catch (e) {
    throw errors.BackendError(e);
  }
};

exports.getAll = async (query) => {
  try {
    let filters = []
    filters = queryParser.addToFilters(query.sender_username,filters,0,'sender_username')
    filters = queryParser.addToFilters(query.receiver_username,filters,0,'receiver_username')
    filters = queryParser.getFilter(filters);
    return await messageDatabaseHelper.getAll(filters);
  } catch (e) {
    throw errors.BackendError(e);
  }
};
exports.getById = async (id) => {
  try {
    return await messageDatabaseHelper.getById(id);
  } catch (e) {
    throw errors.BackendError(e);
  }
};
exports.update = async (id, newMessage) => {
  try {
    return await messageDatabaseHelper.updateById(id, newMessage);
  } catch (e) {
    throw errors.BackendError(e);
  }
};

exports.deleteById = async (id) => {
  try {
    return await messageDatabaseHelper.deleteById(id);
  } catch (e) {
    throw errors.BackendError(e);
  }
};
