const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const config = require("./config/database");
const Item = require('./api/model/Item');
const itemRoutes = require("./api/routes/item");


const app = express();

app.use(cors());

app.use("/api/item", itemRoutes);

mongoose.connect(config.database,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('MongoDB login success !'))
  .catch(() => console.log('MongoDB login failed'));


module.exports = app;

