const { Router } = require("express");
const router = Router();
const { register, getUser } = require("../controllers/user");

router.post("/register", register);
router.get("/user/:id", getUser);

module.exports = router;
