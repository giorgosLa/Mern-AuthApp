import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(200)
      .json({ message: "Unthorized User - No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res
        .status(200)
        .json({ message: "Unthorized User - Invalid provided" });

    req.userId = decoded.userId;
    console.log(req.userId);
    next();
  } catch (err) {
    console.error(err);
  }
};
