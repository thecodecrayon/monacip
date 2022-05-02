const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const app = express();

if(!process.env.JWT_SECRET_KEY) {
  console.log(`FATAL ERROR: Auth key is absent!`);
  process.exit();
}

// MIDDLESWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SETTING THE VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', './views');

// SETTING PUBLIC FOLDER
app.use(express.static(`${__dirname}/public`));

// MOUNTING ROUTES HERE
app.use('/', require('./routes/mainRoutes'));
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/profileRoutes'));

module.exports = app;