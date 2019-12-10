/* eslint-disable no-console */
const mongoose = require('mongoose');
const app = require('./app');
require('./config/config');

mongoose.set('useCreateIndex', true);

// eslint-disable-next-line max-len
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) console.log(`ERROR: connecting to Database. ${err}`);
  else app.listen(process.env.PORT, console.log(`\nAPI started on http://localhost:${process.env.PORT}`));
});
