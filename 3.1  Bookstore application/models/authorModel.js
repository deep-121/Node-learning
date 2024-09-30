const { v4: uuidv4 } = require("uuid");

const authors = [
  { id: uuidv4(), name: "Author One", biography: "Bio of Author One" },
  { id: uuidv4(), name: "Author Two", biography: "Bio of Author Two" },
];

module.exports = authors;
