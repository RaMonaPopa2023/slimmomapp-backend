const jwt = require("jsonwebtoken");
const { RequestError } = require("../helpers/RequestError");
const User = require("../models/user");
require("dotenv").config();

const { TOKEN_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      return next(RequestError(401, "Not authorized"));
    }

    try {
      const { id } = jwt.verify(token, TOKEN_KEY);
      const user = await User.findById(id);
      if (!user || !user.token || user.token !== token) {
        return next(RequestError(401, "Not authorized"));
      }
      req.user = user;
      next();
    } catch (error) {
      return next(RequestError(401, "Not authorized"));
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = auth;
