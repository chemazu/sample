const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Book = new Schema({
  title: String,
  color: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sample: {
    type: mongoose.Schema.ObjectId,
    ref: "sample",
  },
});
const book = mongoose.model("book", Book);
module.exports = book;
