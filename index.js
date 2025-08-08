import express from "express";
import books from "./routes/books.js";
import userRoutes from "./routes/users.js";
import logger from "./middleware/logger.js";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(logger);

app.use("/books", books);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);
});

app.use((err, req, res, next) => {
  console.log("Error occured", err.stack);
  res.status(500).json({ error: "Something went wrong on the server!" });
});

// here is my folder structure
// index.js
// client.js
// data
// - books.js
// - users.js
// routes
// - books.js
// - users.js
// middleware
// - logger.js

// here is package.json
// {
//   "name": "book-review-application",
//   "version": "1.0.0",
//   "description": "",
//   "main": "index.js",
//   "type": "module",
//   "scripts": {
//     "test": "node indes.js",
//     "dev": "nodemon index.js"
//   },
//   "keywords": [],
//   "author": "",
//   "license": "ISC",
//   "dependencies": {
//     "express": "^5.1.0",
//     "nodemon": "^3.1.10"
//   }
// }
