const { Router } = require("express");
const Sample = require("../models/Sample.model");
const advancedResults = require("../middleware/advancedResults");
const {
  getSample,
  getSamples,
  createSample,
  updateSample,
  deleteSample,
} = require("../controllers/sample");
const router = Router();

router.get("/", (req, res) => {
  res.send({ msg: "home route" });
});

router.get(
  "/samples",
  advancedResults(Sample, { path: "user", select: "name email role" }),
  getSamples
);
// router.route("/samples").get(advancedResults(Sample, "user"), getSamples);
router.get("/sample/:id", getSample);
router.post("/addsample", createSample);
router.put("/updatesample/:id", updateSample);
router.delete("/deletesample/:id", deleteSample);

module.exports = router;
