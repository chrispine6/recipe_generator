// /middleware/authMiddleware.js

module.exports.ensureAuthenticated = (req, res, next) => {
  console.log('Session user ID:', req.session.userId);
  if (req.session.userId) {
    return next();
  } else {
    res.redirect('/login');
  }
};
