const path = require("path");
const asyncHandler = require("../middleware/async");
const Sample = require("../models/Sample.model");
const ErrorResponse = require("../utils/errorResponse");

//Create sample
//route: "Post " /addsample

exports.createSample = async (req, res, next) => {
  try {
    const newSample = await Sample.create(req.body);
    if (!newSample) {
      return res.status(400).json({ success: false, msg: "error in upload" });
    }
    res.status(201).json({ success: true, data: newSample });
  } catch (error) {
    next(new ErrorResponse(`Error in creating new Sample`, 500));
    console.log(error);
  }
};

//Get all samples
//route: "get " /samples

exports.getSamples = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//Get sample by id
//route: "get" /sample/:id

exports.getSample = async (req, res, next) => {
  try {
    const sample = await Sample.findById(req.params.id);
    if (!sample) {
      next(
        new ErrorResponse(`No Sample found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: sample });
  } catch (error) {
    next(new ErrorResponse(`No Sample found with id of ${req.params.id}`, 404));
  }
};

//Update sample by id
//route: "put" "/updatesample/:id"

exports.updateSample = async (req, res, next) => {
  try {
    const sample = await Sample.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!sample) {
      next(
        new ErrorResponse(`No Sample found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: sample });
    next();
  } catch (error) {
    console.log(error);
  }
};

//Delete sample by id
//route: "delete" "/updatesample/:id"

exports.deleteSample = async (req, res, next) => {
  try {
    const sample = await Sample.findByIdAndDelete(req.params.id);
    if (!sample) {
      new ErrorResponse(`No Sample found with id of ${req.params.id}`, 404);
    }
    res.status(200).json({ success: true, data: "deleted{}" });
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.samplePhotoUpload = async (req, res, next) => {
  const id = req.params.id;
  const file = req.files[Object.keys(req.files)[0]];
  try {
    const sample = await Sample.findById(req.params.id);
    if (!sample) {
      return next(
        new ErrorResponse(`No Sample found with id of ${req.params.id}`, 404)
      );
    }
    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 404));
    }
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please upload an image`, 404));
    }
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          404
        )
      );
    }
    //CREATE CUSTOM FILENAME
    file.name = `photo_${sample._id}${path.parse(file.name).ext}`;
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.log(err);
      }
      await Sample.findByIdAndUpdate(id, {
        image: file.name,
      });
    });
    res
      .status(200)
      .json({ sucess: true, message: "photo uploaded", file: file.name });
    next();
  } catch (error) {
    console.log(error);
  }
};
