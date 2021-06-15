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
} = require("../controllers/sample");
const router = Router();

router.get("/", logger, (req, res) => {
  res.send({ msg: "home route", logger: req.hello });
});

router.get(
  "/samples",
  advancedResults(Sample, { path: "user", select: "name email role" }),
  getSamples
);
// router.route("/samples").get(advancedResults(Sample, "user"), getSamples);
router.get("/sample/:id", getSample);
router.post("/addsample", createSample);
router.get("/try", logger("potatoes"), tryMiddle); // for middleware
router.put("/updatesample/:id", updateSample);
router.delete("/deletesample/:id", deleteSample);

module.exports = router;
