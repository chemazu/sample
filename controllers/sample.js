const Sample = require("../model/Sample.model");

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
  getSamples: async (req, res, next) => {
    try {
      const samples = await Sample.find();
      if (!sample) {
        return res.status(400).json({ success: false });
      }
      res
        .status(200)
        .json({ success: true, count: samples.length, data: samples });
      next();
    } catch (error) {
      console.log(error);
    }
  },
  getSample: async (req, res, next) => {
    try {
      const sample = await Sample.findById(req.params.id);
      if (!sample) {
        return res.status(400).json({ success: false });
      }
      res.status(200).json({ success: true, data: sample });

      next();
    } catch (error) {
      console.log(error);
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
