const errors = require("@utils/error");
const authService = require("@services/auth");
const userDatabaseHelper = require("@database-helpers/user");

module.exports = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  const decodedToken = authService.verifyToken(token);
  if (decodedToken) {
    if (
      req.session?.user &&
      decodedToken._id == req.session?.user._id
    ) {
      next();
    } else {
      try {
        const user = await userDatabaseHelper.getById(decodedToken._id)
        req.session.user = { username: user.username, _id: user._id };
        next();
      } catch (error) {
       next(errors.AuthorizationError({ message: "User Not Found!" }));
      }
    }
  } else {
    next(errors.AuthorizationError({ message: "Token not verified!" }));
  }
};
