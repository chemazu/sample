const { Router } = require("express");
const { addBook } = require("../controllers/book");
const router = Router();
router.post("/addbook", addBook);
