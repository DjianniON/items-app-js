const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const config = require("./config/database");
const bodyParser = require("body-parser");

const itemRoutes = require("./api/routes/item");
const userRoutes = require('./api/routes/user');

const app = express();

app.use(cors());

mongoose.connect(config.database,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('MongoDB login success !'))
    .catch(() => console.log('MongoDB login failed'));
mongoose.set('useCreateIndex', true)

app.use("/api/item", itemRoutes);
app.use("/api/auth", userRoutes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app;

