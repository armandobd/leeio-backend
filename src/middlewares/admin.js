module.exports = function admin(req, res, next) {
  if (!req.res.isAdmin) return res.status(403).send("Access denied.");
  next();
};

// module.exports.admin = admin;
