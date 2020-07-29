const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const config = require("./config/database");
const bodyParser = require("body-parser");

const path = require('path');

const itemRoutes = require("./api/routes/item");
const userRoutes = require('./api/routes/user');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect(config.database,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB login success !'))
  .catch(() => console.log('MongoDB login failed'));
mongoose.set('useCreateIndex', true)

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/item", itemRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
