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
  tryMiddle,
  samplePhotoUpload,
} = require("../controllers/sample");
const router = Router();
router.get(
  "/samples",
  advancedResults(Sample, { path: "user", select: "name email role" }),
  getSamples
);
router.get("/sample/:id", getSample);
router.post("/addsample", createSample);
router.get("/try", logger("potatoes"), tryMiddle); // for middleware
router.put("/updatesample/:id", updateSample);
router.delete("/deletesample/:id", deleteSample);
router.put("/:id/upload", samplePhotoUpload);
module.exports = router;
