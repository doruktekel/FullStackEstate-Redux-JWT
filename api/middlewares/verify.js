import jwt from "jsonwebtoken";
import { handleError } from "./errormiddleware.js";

const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(handleError(403, "No token provided , Unauthorized"));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decoded) {
    return next(handleError(403, "Token is not valid , Forbidden"));
  }
  req.user = decoded;
  next();
};

export default verifyUser;
