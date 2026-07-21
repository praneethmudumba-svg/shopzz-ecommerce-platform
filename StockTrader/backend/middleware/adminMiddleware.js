const adminOnly = (req, res, next) => {
  try {
    // Check if user exists
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // Check admin role
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Access denied. Admin only",
      });
    }

    next();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  adminOnly,
};