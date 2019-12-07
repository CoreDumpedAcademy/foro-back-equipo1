const mongoose = require('mongoose');
const app = require('./app');

mongoose.set('useCreateIndex', true);

const mongodb = process.env.MONGODB || 'mongodb://localhost:27017/forodb';
const port = process.env.PORT || 3000;

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) { console.log(`ERROR: connecting to Database. ${err}`); }
    else app.listen(port, console.log(`API started on http://localhost:${port}`));
})
