const asyncHandler = require("../middleware/async");
const User = require("../models/User.model");
const ErrorResponse = require("../utils/errorResponse");

module.exports = {
  register: async (req, res, next) => {
    let query = User.create(req.body);
    try {
      const newUser = await query;

      if (!newUser) {
        return res.status(400).json({ success: false, msg: "error in upload" });
      }
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      console.log(error);
    }
  },
  getUser: async (req, res, next) => {
    const user = await User.findById(req.params.id).populate("samples");
    res.send(user);
  },
};
