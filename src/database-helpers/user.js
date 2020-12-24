const userModel = require("@models/user");
const errors = require("@utils/error");

exports.getAll = async () => {
  return userModel
    .find({},'-password')
    .then((result) => {
      if (!result) {
        throw errors.BackendError({ message: "No User Found" });
      }
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

exports.getById = async (id) => {
  return userModel
    .findById(id)
    .then((result) => {
      if (!result) {
        throw errors.BackendError({ message: "No User Found" });
      }
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
exports.getOne = async (query, fields) => {
  return userModel
    .findOne(query, fields)
    .then((result) => {
      if (!result) {
        throw errors.BackendError({ message: "No User Found" });
      }
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
exports.post = async (data, session) => {
  const newRecord = userModel(data);
  return newRecord
    .save({ session })
    .then((result) => {
      if (!result) {
        throw errors.BackendError({ message: "User Not Added" });
      }
      return result;
    })
    .catch((err) => {
      throw err;
    });
};

exports.updateById = async (id, data, session) => {
  return userModel
    .findByIdAndUpdate(id, data, { session, new:true })
    .then((result) => {
      if (!result) {
        throw errors.BackendError({ message: "User Not Updated" });
      }
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
exports.updateOne = async (filter, data, session) => {
  return userModel
    .findOneAndUpdate(filter, data, { session, new:true })
    .then((result) => {
      if (!result) {
        throw errors.BackendError({ message: "User Not Updated" });
      }
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
exports.deleteById = async (id, session) => {
  return userModel
    .findByIdAndRemove(id, { session, new:true })
    .then((result) => {
      if (!result) {
        throw errors.BackendError({ message: "User Not Deleted" });
      }
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
