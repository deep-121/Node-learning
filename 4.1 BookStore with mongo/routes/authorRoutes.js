const express = require("express");
const router = express.Router();
const Author = require("../models/authorModel");

// GET all authors
router.get("/", async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    next(error);
  }
});

// POST a new author
router.post("/", async (req, res, next) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
});

// GET a single author by ID
router.get("/:id", async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).send("Author not found");
    res.json(author);
  } catch (error) {
    next(error);
  }
});

// PUT (update) an author by ID
router.put("/:id", async (req, res, next) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!author) return res.status(404).send("Author not found");
    res.json(author);
  } catch (error) {
    next(error);
  }
});

// DELETE an author by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).send("Author not found");
    res.json({ message: "Author deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
