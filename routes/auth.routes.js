const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

// Landing Page Route
router.get('/', (req, res) => {
  res.render('landing');
});

// Registration Page Route
router.get('/register', (req, res) => {
  res.render('registration');
});

// Registration Handler
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.redirect('/register');
  }
});

// Login Page Route
router.get('/login', (req, res) => {
  res.render('login');
});

// Login Handler
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch);

      if (isMatch) {
        req.session.userId = user._id;
        console.log('Session user ID set:', req.session.userId);
        return res.redirect('/home');
      }
    }

    console.log('Invalid credentials');
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.redirect('/login');
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/home');
    }

    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

module.exports = router;
