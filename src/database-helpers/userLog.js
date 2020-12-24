const userLogModel = require("@models/userLog");
const errors = require("@utils/error");

exports.getOne = async (query, fields) => {
  return userLogModel
    .findOne(query, fields)
    .then((result) => {
      if (!result) {
        throw errors.BackendError({ message: "No Record Found" });
      }
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
exports.updateOne = async (filter, data, session) => {
  return userLogModel
    .findOneAndUpdate(filter, data, { session, new:true, upsert:true })
    .then((result) => {
      if (!result) {
        throw errors.BackendError({ message: "Record Not Updated" });
      }
      return result;
    })
    .catch((err) => {
      throw err;
    });
};
