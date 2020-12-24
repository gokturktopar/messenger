const messageModel = require("@models/message");
const errors = require("@utils/error");

exports.getAll = async (filter) => {
  const filterF = filter ?? {}
  return messageModel
    .find(filterF)
    .then((result) => {
      if (!result) {
        throw errors.BackendError({ message: "No Message Found" });
      }
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

exports.getById = async (id) => {
  return messageModel
    .findById(id)
    .then((result) => {
      if (!result) {
        throw errors.BackendError({ message: "No Message Found" });
      }
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
exports.getOne = async (query, fields) => {
  return messageModel
    .findOne(query, fields)
    .then((result) => {
      if (!result) {
        throw errors.BackendError({ message: "No Message Found" });
      }
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
exports.post = async (data, session) => {
  const newRecord = messageModel(data);
  return newRecord
    .save({ session })
    .then((result) => {
      if (!result) {
        throw errors.BackendError({ message: "Message Not Added" });
      }
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

exports.updateById = async (id, data, session) => {
  return messageModel
    .findByIdAndUpdate(id, data, { session, new:true })
    .then((result) => {
      if (!result) {
        throw errors.BackendError({ message: "Message Not Updated" });
      }
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
exports.deleteById = async (id, session) => {
  return messageModel
    .findByIdAndRemove(id, { session, new:true })
    .then((result) => {
      if (!result) {
        throw errors.BackendError({ message: "Message Not Deleted" });
      }
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
