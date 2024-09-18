const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");

let books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publishedYear: 1960,
    description: "A novel about racial injustice in the American South.",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publishedYear: 1949,
    description: "A novel about totalitarianism and mass surveillance.",
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    publishedYear: 1925,
    description: "A novel about the American dream and social upheaval.",
  },
];

// Joi validation schema
const bookSchema = Joi.object({
  title: Joi.string().max(100).required().messages({
    "string.empty": "Title is required",
    "string.max": "Title must be at most 100 characters",
  }),
  author: Joi.string().max(50).required().messages({
    "string.empty": "Author is required",
    "string.max": "Author must be at most 50 characters",
  }),
  genre: Joi.string().max(30).optional().messages({
    "string.max": "Genre must be at most 30 characters",
  }),
  publishedYear: Joi.number()
    .integer()
    .min(1500)
    .max(new Date().getFullYear())
    .required()
    .messages({
      "number.base": "Published Year must be a valid number",
      "number.min": "Published Year must be at least 1500",
      "number.max": `Published Year must not exceed ${new Date().getFullYear()}`,
    }),
  description: Joi.string().optional().messages({
    "string.max": "Description must be at most 500 characters",
  }),
});

// Get all books
exports.getBooks = (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;
    let filteredBooks = books;

    if (author) {
      filteredBooks = filteredBooks.filter((book) =>
        book.author.toLowerCase().includes(author.toLowerCase())
      );
    }

    if (genre) {
      filteredBooks = filteredBooks.filter((book) =>
        book.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const resultBooks = filteredBooks.slice(startIndex, endIndex);
    res.status(200).json({
      total: filteredBooks.length,
      page: parseInt(page),
      limit: parseInt(limit),
      data: resultBooks,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a book by ID
exports.getBookById = (req, res) => {
  try {
    const book = books.find((b) => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new book
exports.addBook = (req, res) => {
  const { error } = bookSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  }

  try {
    const { title, author, genre, publishedYear, description } = req.body;
    const newBook = {
      id: uuidv4(),
      title,
      author,
      genre,
      publishedYear,
      description,
    };

    books.push(newBook);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a book by ID
exports.updateBook = (req, res) => {
  const { error } = bookSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  }

  try {
    const bookIndex = books.findIndex((b) => b.id === req.params.id);

    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }

    const updatedBook = { ...books[bookIndex], ...req.body };
    books[bookIndex] = updatedBook;

    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a book by ID
exports.deleteBook = (req, res) => {
  try {
    const bookIndex = books.findIndex((b) => b.id === req.params.id);

    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }

    books.splice(bookIndex, 1);
    res.status(200).json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
