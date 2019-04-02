module.exports = function(req, res, next) {
  if (!req.res.isAdmin) return res.status(403).send("Access denied.");

  next();
};
