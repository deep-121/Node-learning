const express = require("express");
const { v4: uuidv4 } = require("uuid");
const categories = require("../models/categoryModel");

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      const error = new Error("Name and description are required");
      error.status = 400;
      throw error;
    }
    const newCategory = { id: uuidv4(), name, description };
    categories.push(newCategory);
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const category = categories.find((c) => c.id === req.params.id);
    if (!category) {
      const error = new Error("Category not found");
      error.status = 400;
      throw error;
    }
    res.json(category);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    const categoryIndex = categories.findIndex((c) => c.id === req.params.id);
    if (categoryIndex === -1) {
      const error = new Error("Category not found");
      error.status = 400;
      throw error;
    }

    const { name, description } = req.body;
    if (!name || !description) {
      const error = new Error("Name and description are required");
      error.status = 400;
      throw error;
    }

    categories[categoryIndex] = {
      id: categories[categoryIndex].id,
      name,
      description,
    };
    res.json(categories[categoryIndex]);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const categoryIndex = categories.findIndex((c) => c.id === req.params.id);
    if (categoryIndex === -1) {
      const error = new Error("Category not found");
      error.status = 400;
      throw error;
    }

    categories.splice(categoryIndex, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
