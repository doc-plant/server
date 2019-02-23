const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = '3000';
const userRouter = require('./routes/users');

mongoose.connect(`mongodb://localhost/doc-plant`, { useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRouter);

app.listen(port, () => {
  console.log('Listening on PORT', port);
});

module.exports = app;

