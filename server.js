// node module imports
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

// route imports
const authRoutes = require('./routes/auth.routes');

const app = express();
app.set('view engine', 'ejs');

// mongoose connection script

app.listen(3000, () => {
    console.log('server running on http://localhost:3000');
});

// api to route connection
app.use('/', authRoutes);