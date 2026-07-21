const jwt = require("jsonwebtoken");
const User = require("../models/User");


const protect = async (req, res, next) => {
  let token;

  try {
    const authHeader = req.headers.authorization;

    if (
      authHeader &&
      authHeader.startsWith("Bearer ")
    ) {

      token = authHeader.split(" ")[1];


      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );


      req.user = await User.findById(decoded.id)
        .select("-password");


      return next();
    }


    return res.status(401).json({
      message: "Not authorized, token missing",
    });


  } catch (error) {

    console.error(error);

    return res.status(401).json({
      message: "Not authorized, invalid token",
    });

  }
};


// Admin Only Access
const adminOnly = (req, res, next) => {

  if (
    req.user &&
    req.user.role === "ADMIN"
  ) {

    return next();

  }


  return res.status(403).json({
    message: "Admin access required",
  });

};


module.exports = {
  protect,
  adminOnly,
};