const { Router } = require("express");
// const { home } = require("../controllers/controller");
const {
  getSample,
  getSamples,
  createSample,
  updateSample,
  deleteSample,
} = require("../controllers/sample");
const router = Router();

router.get("/", (req, res) => {
  res.send({ mssg: "dam" });
});
router.get("/samples", getSamples);
router.get("/sample/:id", getSample);
router.post("/addsample", createSample);
router.put("/updatesample/:id", updateSample);
router.delete("/deletesample/:id", deleteSample);

module.exports = router;
