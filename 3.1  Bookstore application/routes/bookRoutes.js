const express = require("express");
const { v4: uuidv4 } = require("uuid");
const books = require("../models/bookModel");
const authors = require("../models/authorModel");
const categories = require("../models/categoryModel");

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    const booksWithDetails = books.map((book) => ({
      ...book,
      author: authors.find((author) => author.id === book.authorId),
      category: categories.find((category) => category.id === book.categoryId),
    }));
    res.json(booksWithDetails);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    const { title, authorId, categoryId, publicationYear } = req.body;
    if (!title || !authorId || !categoryId || !publicationYear) {
      const error = new Error(
        "Title, author ID, category ID, and publication year are required"
      );
      error.status = 400;
      throw error;
    }

    const newBook = {
      id: uuidv4(),
      title,
      authorId,
      categoryId,
      publicationYear,
    };
    books.push(newBook);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const book = books.find((b) => b.id === req.params.id);
    if (!book) {
      const error = new Error("Book not found");
      error.status = 400;
      throw error;
    }
    const bookWithDetails = {
      ...book,
      author: authors.find((author) => author.id === book.authorId),
      category: categories.find((category) => category.id === book.categoryId),
    };
    res.json(bookWithDetails);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    const bookIndex = books.findIndex((b) => b.id === req.params.id);
    if (bookIndex === -1) {
      const error = new Error("Book not found");
      error.status = 400;
      throw error;
    }

    const { title, authorId, categoryId, publicationYear } = req.body;
    if (!title || !authorId || !categoryId || !publicationYear) {
      const error = new Error(
        "Title, author ID, category ID, and publication year are required"
      );
      error.status = 400;
      throw error;
    }

    books[bookIndex] = {
      id: books[bookIndex].id,
      title,
      authorId,
      categoryId,
      publicationYear,
    };
    res.json(books[bookIndex]);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const bookIndex = books.findIndex((b) => b.id === req.params.id);
    if (bookIndex === -1) {
      const error = new Error("Book not found");
      error.status = 400;
      throw error;
    }

    books.splice(bookIndex, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
