const { Router } = require("express");
const Sample = require("../models/Sample.model");
const advancedResults = require("../middleware/advancedResults");
const logger = require("../middleware/logger");
const {
  getSample,
  getSamples,
  createSample,
  updateSample,
  deleteSample,
  samplePhotoUpload,
} = require("../controllers/sample");
const { protect } = require("../middleware/auth");

const router = Router();
router.get(
  "/samples",
  advancedResults(Sample, { path: "user", select: "name email role" }),

  getSamples
);
router.get("/sample/:id", protect, getSample);
router.post("/addsample", protect, createSample);
router.put("/updatesample/:id", protect, updateSample);
router.delete("/deletesample/:id", protect, deleteSample);
router.put("/:id/upload", protect, samplePhotoUpload);
module.exports = router;
