const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  publicationYear: { type: Number, required: true },
});
module.exports = mongoose.model("Book", bookSchema);
