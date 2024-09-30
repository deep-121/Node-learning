// app.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/categories", categoryRoutes);

// Error handling middleware (must be placed after routes)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
