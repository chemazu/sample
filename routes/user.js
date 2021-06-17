const { Router } = require("express");
const router = Router();
const { register } = require("../controllers/user");

router.post("/register", register);

module.exports = router;
