const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Sample = new Schema({
  title: String,
  description: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
});

// const Sample = new Schema({ title: { type: String, required: true } });
// const Sample = new Schema({ title: String });

const sample = mongoose.model("sample", Sample);

module.exports = sample;
