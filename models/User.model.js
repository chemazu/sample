const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema(
  {
    name: {
      type: String,
      required: [true, "please add a message"],
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
      trim: true,
      maxlength: [50, "cant be more that 50 chracters"],
    },
    password: {
      type: String,
      required: [true, "please add a message"],
      trim: true,
      minlength: [8, "Must be more than 8 Characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    sample: {
      type: mongoose.Schema.ObjectId,
      ref: "sample",
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

User.virtual("samples", {
  ref: "sample",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});
const user = mongoose.model("user", User);

module.exports = user;
