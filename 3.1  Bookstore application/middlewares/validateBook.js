const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().min(3).required(),
  authorId: Joi.string().required(),
  categoryId: Joi.string().required(),
  publicationYear: Joi.number()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
});

const validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.status = 400;
    next(validationError);
  } else {
    next();
  }
};

module.exports = validateBook;
