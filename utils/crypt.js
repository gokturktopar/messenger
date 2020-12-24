const bcrypt = require("bcryptjs");
const hash = async (data) => {
  return bcrypt.hash(data, 10);
};
const compare = async (data1, data2) => bcrypt.compare(data1, data2);
module.exports = {
  hash,
  compare,
};
