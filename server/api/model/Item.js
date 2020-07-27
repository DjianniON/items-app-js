let mongoose = require("mongoose");

let itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description : {
    type: String,
    required: true
  },
  img: {
    type: Object,
    required: true
  },
  foundDate: {
    type: Date,
    required: true
  },
  isResolved: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Item", itemSchema);