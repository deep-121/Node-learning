const { v4: uuidv4 } = require("uuid");

const categories = [
  {
    id: uuidv4(),
    name: "Category One",
    description: "Description of Category One",
  },
  {
    id: uuidv4(),
    name: "Category Two",
    description: "Description of Category Two",
  },
];

module.exports = categories;
