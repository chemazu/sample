const asyncHandler = require("../middleware/aysnc");
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
};
