const jwt = require("jsonwebtoken");
const errors = require("@utils/error");
const config = require("@configs/default");
const bcrypt = require("@utils/crypt");
const userDatabaseHelper = require("@database-helpers/user");

exports.verifyToken = (token) => {
  return jwt.verify(token, config.apiSecretKey, (err, resultDecode) => {
    if (err) return false;
    return resultDecode;
  });
};

/**
 *
 * @param {Object} user
 * @param {string} user.username
 * @param {string} user.password
 */
exports.register = async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password);
    user.password = hashedPassword;
    const {_id, username} = await userDatabaseHelper.post(
      user
    );
    return {_id, username};
  } catch (e) {
    throw errors.BackendError(e);
  }
};
/**
 *
 * @param {Object} loginData
 * @param {string} loginData.username
 * @param {string} loginData.password
 */
exports.login = async (loginData) => {
  try {
    const { username, email, password, _id } = await userDatabaseHelper.getOne(
      { username: loginData.username },
      "username email _id password"
    );
    const passMatched = await bcrypt.compare(loginData.password, password);
    if (!passMatched) {
      throw errors.AuthorizationError({ message: "Password is wrong!" });
    }
    const token = exports.createToken({
      username,
      password,
      email,
      _id,
    });
    return { username, email, _id, token };
  } catch (e) {
    throw errors.BackendError(e);
  }
};
/**
 *
 * @param {*} payload
 * @param {string} payload.username
 * @param {string} payload.password
 * @param {string} payload.email
 * @param {string} payload._id - user's _id
 */
exports.createToken = (payload) => {
  const token = jwt.sign(payload, config.apiSecretKey, {
    expiresIn: config.tokenExpirePeriod,
  });
  return token;
};
