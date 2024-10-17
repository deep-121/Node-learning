const express = require("express");
const router = express.Router();
const Category = require("../models/categoryModel");

// GET all categories
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// POST a new category
router.post("/", async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

// GET a single category by ID
router.get("/:id", async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send("Category not found");
    res.json(category);
  } catch (error) {
    next(error);
  }
});

// PUT (update) a category by ID
router.put("/:id", async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) return res.status(404).send("Category not found");
    res.json(category);
  } catch (error) {
    next(error);
  }
});

// DELETE a category by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).send("Category not found");
    res.json({ message: "Category deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
