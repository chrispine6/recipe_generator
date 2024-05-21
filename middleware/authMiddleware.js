// In middleware/authMiddleware.js
module.exports = function isAuthenticated(req, res, next) {
  if (!req.user) {  // Assuming `req.user` is populated by some authentication process
    res.status(401).send('User not authenticated');
  } else {
    next();
  }
};
