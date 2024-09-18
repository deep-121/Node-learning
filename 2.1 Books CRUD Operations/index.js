const express = require("express");
const bodyParser = require("body-parser");
const booksRoutes = require("./routes/books");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
app.use(bodyParser.json());

// Book routes
app.use("/books", booksRoutes);

// Handle 404 (invalid routes)
app.use(notFound);

// Global error handler
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
