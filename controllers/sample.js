const asyncHandler = require("../middleware/async");
const Sample = require("../models/Sample.model");
const ErrorResponse = require("../utils/errorResponse");

module.exports = {
  createSample: async (req, res, next) => {
    try {
      const newSample = await Sample.create(req.body);
      if (!newSample) {
        return res.status(400).json({ success: false, msg: "error in upload" });
      }
      res.status(201).json({ success: true, data: newSample });
    } catch (error) {
      console.log(error);
    }
    next();
  },
  getSamples: asyncHandler(async (req, res, next) => {
    // console.log(res.advancedResults);
    res.status(200).json(res.advancedResults);
  }),
  getSample: async (req, res, next) => {
    try {
      const sample = await Sample.findById(req.params.id);
      if (!sample) {
        next(
          new ErrorResponse(`No Sample found with id of ${req.params.id}`, 404)
        );
      }
      res.status(200).json({ success: true, data: sample });

      // next();
    } catch (error) {
      // res.status(200).json({ error });
      next(
        new ErrorResponse(`No Sample found with id of ${req.params.id}`, 404)
      );
    }
  },
  updateSample: async (req, res, next) => {
    try {
      const sample = await Sample.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!sample) {
        return res.status(400).json({ success: false });
      }
      res.status(200).json({ success: true, data: sample });
      next();
    } catch (error) {
      console.log(error);
    }
  },
  deleteSample: async (req, res, next) => {
    try {
      const sample = await Sample.findByIdAndDelete(req.params.id);
      if (!sample) {
        return res.status(400).json({ success: false });
      }
      res.status(200).json({ success: true, data: "deleted{}" });
      next();
    } catch (error) {
      console.log(error);
    }
  },
};
