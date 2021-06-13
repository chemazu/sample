const asyncHandler = require("../middleware/aysnc");
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
    const reqQuery = { ...req.query };
    const removeFields = ["select", "sort", "page", "limit"];
    removeFields.forEach((param) => delete reqQuery[param]);
    let query;

    query = Sample.find(reqQuery).populate("user");
    //querys are ?select="something"
    //the first starts with "?",subsequent ones with "&"
    //select what is returned field
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }
    //sort by
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    //pagination
    const page = parseInt(req.query.page, 10) || 1; //page is passed as a string
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit; // the way i understand this, it skips a certain amount of docs, eg. on page 3 of  with limit 10, they will skip 20 docs((3-1)X10), ie 10 for page 1, and another 10 for page 2
    const endIndex = page * limit; //this is to get prev and next
    total = await Sample.countDocuments();
    query = query.skip(startIndex).limit(limit);

    const samples = await query;
    const pagination = {};
    //pagination results
    if (endIndex < total) {
      pagination.next = { page: page + 1, limit: limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit: limit };
    }
    if (!samples) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      count: samples.length,
      pagination: pagination,
      data: samples,
    });
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
