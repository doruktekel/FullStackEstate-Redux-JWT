import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const verifyUser = expressAsyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error("No token provided , Unauthorized");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decoded) {
    res.status(403);
    throw new Error("Token is not valid , Forbidden");
  }
  req.user = decoded;
  next();
});

export default verifyUser;
