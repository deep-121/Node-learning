const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().required(),
  authorId: Joi.string().min(2).max(100).required(),
  categoryId: Joi.string().required(),
  publicationYear: Joi.number().required().max(new Date().getFullYear()),
});

const validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = { validateBook };
