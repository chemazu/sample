const asyncHandler = require("../middleware/async");
const User = require("../models/User.model");
const ErrorResponse = require("../utils/errorResponse");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const newUser = User.create({ name, email, password, role });
  res.status(200).json({ success: "true", user: newUser });
});
