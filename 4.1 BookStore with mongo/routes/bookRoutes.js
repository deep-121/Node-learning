const express = require("express");
const router = express.Router();
const { validateBook } = require("../middlewares/validateBook");
const Book = require("../models/bookModel");

// GET all books
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find().populate("authorId").populate("categoryId");
    res.json(books);
  } catch (error) {
    next(error);
  }
});

// POST a new book
router.post("/", validateBook, async (req, res, next) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
});

// GET a single book by ID
router.get("/:id", async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Book not found");
    res.json(book);
  } catch (error) {
    next(error);
  }
});

// PUT (update) a book by ID
router.put("/:id", validateBook, async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) return res.status(404).send("Book not found");
    res.json(book);
  } catch (error) {
    next(error);
  }
});

// DELETE a book by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send("Book not found");
    res.json({ message: "Book deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
