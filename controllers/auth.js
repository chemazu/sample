const asyncHandler = require("../middleware/async");
const User = require("../models/User.model");
const ErrorResponse = require("../utils/errorResponse");

//Register user
//route "Post" /register
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const newUser = await User.create({ name, email, password, role });
  //Create token
  const token = newUser.getSignedJwtToken();
  res.status(200).json({ success: "true", token });
});
//Login user
//route "Post" /login

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  //Create token
  const token = user.getSignedJwtToken();

  //match password

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    next(new ErrorResponse("invalid credentials password", 401));
  }

  res.status(200).json({ success: "true", token });
});
