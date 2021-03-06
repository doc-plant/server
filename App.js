const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const logger = require('morgan');
// const seed = require('./seed/seed');
const NODE_ENV = process.env.NODE_ENV
const app = express();
const port = '3000';
const userRouter = require('./routes/users');
const historyRouter = require('./routes/histories');
const diseaseRouter = require('./routes/diseases');
const recommendRouter = require('./routes/recommendations');
const plantRouter = require('./routes/plants');

mongoose.connect(`mongodb://localhost/doc-plant-${NODE_ENV}`, { useNewUrlParser: true });
// mongoose.connect(`mongodb://docplant:docplant12@ds343985.mlab.com:43985/docplant`, { useNewUrlParser: true });

app.use(cors());
app.use(logger('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/', (req, res) => {
//   seed()
// })
app.use('/users', userRouter);
app.use('/histories', historyRouter);
app.use('/diseases', diseaseRouter);
app.use('/recommendations', recommendRouter);
app.use('/plants', plantRouter);

app.listen(port, () => {
  console.log('Listening on PORT', port);
});

module.exports = app;