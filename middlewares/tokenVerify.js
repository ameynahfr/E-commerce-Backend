import jwt from "jsonwebtoken";

export const tokenVerify = async (req, res, next) => {
  let token;
  let authHead = req.headers.authorization;
  if (!authHead) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }
  token = authHead.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (error) => {
    if (error) {
      res.status(400).json({ message: error.message });
    }
    console.log("Token successfully verified");
    next();
  });
};
