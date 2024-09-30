const { v4: uuidv4 } = require("uuid");

const books = [
  {
    id: uuidv4(),
    title: "Book One",
    authorId: 1,
    categoryId: 1,
    publicationYear: 2000,
  },
  {
    id: uuidv4(),
    title: "Book Two",
    authorId: 2,
    categoryId: 2,
    publicationYear: 2010,
  },
];

module.exports = books;
