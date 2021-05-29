const { Router } = require("express");
// const { home } = require("../controllers/controller");
const { getSamples, createSample } = require("../controllers/sample");
const router = Router();

router.get("/", (req, res) => {
  res.send({ mssg: "dam" });
});
router.get("/samples", getSamples);
router.post("/addsample", createSample);
module.exports = router;
