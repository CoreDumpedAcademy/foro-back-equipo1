const bodyParser = require('body-parser');
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', userRoutes);

module.exports = app;
