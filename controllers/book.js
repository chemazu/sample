const Book = require("../models/Book.model");
exports.addBook = async (req, res, next) => {
  const newBook = Book.create(req.body);
  console.log(newBook);
};
