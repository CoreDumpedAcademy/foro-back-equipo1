const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoute');
const msgRoutes = require('./routes/messageRoute');

const app = express();

// Cors
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/message', msgRoutes);

module.exports = app;
