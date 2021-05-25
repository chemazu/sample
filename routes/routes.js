const { Router } = require("express");
const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Welcome " });
});
module.exports = router;
