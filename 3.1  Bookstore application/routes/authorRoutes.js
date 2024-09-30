const express = require("express");
const { v4: uuidv4 } = require("uuid");
const authors = require("../models/authorModel");

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.json(authors);
  } catch (err) {
    next(err);
  }
});
router.post("/", (req, res, next) => {
  try {
    const { name, biography } = req.body;
    if (!name || !biography) {
      const error = new Error("Name and biography are required");
      error.status = 400;
      throw error;
    }

    const newAuthor = { id: uuidv4(), name, biography };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const author = authors.find((a) => a.id === req.params.id);
    if (!author) {
      const error = new Error("Author not found");
      error.status = 400;
      throw error;
    }
    res.json(author);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    const authorIndex = authors.findIndex((a) => a.id === req.params.id);
    if (authorIndex === -1) {
      const error = new Error("Author not found");
      error.status = 400;
      throw error;
    }

    const { name, biography } = req.body;
    if (!name || !biography) {
      const error = new Error("Name and biography are required");
      error.status = 400;
      throw error;
    }

    authors[authorIndex] = { id: authors[authorIndex].id, name, biography };
    res.json(authors[authorIndex]);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const authorIndex = authors.findIndex((a) => a.id === req.params.id);
    if (authorIndex === -1) {
      const error = new Error("Author not found");
      error.status = 400;
      throw error;
    }

    authors.splice(authorIndex, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
