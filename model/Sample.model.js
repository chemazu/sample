const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Sample = new Schema({
  name: {
    type: String,
    required: [true, "please add a message"],
    unique: true,
    trim: true,
    maxlength: [50, "cant be more that 50 chracters"],
  },
  slug: String,
  email: {
    type: String,
    required: [true, "please add a message"],
    unique: true,
    trim: true,
    maxlength: [50, "cant be more that 50 chracters"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please input a valid mail",
    ],
  },
  role: {
    type: String,
    required: [true, "please add a message"],
    unique: true,
    trim: true,
    maxlength: [50, "cant be more that 50 chracters"],
  },
  password: {
    type: String,
    required: [true, "please add a message"],
    unique: true,
    trim: true,
    minlength: [8, "Must be more than 8 Characters"],
  },
});

// const Sample = new Schema({ title: { type: String, required: true } });
// const Sample = new Schema({ title: String });

const sample = mongoose.model("sample", Sample);

module.exports = sample;
