import express from "express";
import books from "../data/books.js";
import users from "../data/users.js";

const router = express.Router();

// ++++++++++++++++++++ Task 1 ++++++++++++++++++++
router.get("", (req, res) => {
  res.json(books);
});

// ++++++++++++++++++++ Task 2 ++++++++++++++++++++
router.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) {
    return res
      .status(404)
      .send({ msg: `Books not found with this ISBN: ${isbn}` });
  }
  res.status(200).json(book);
});

// ++++++++++++++++++++ Task 3: Get all books by Author ++++++++++++++++++++
router.get("/author/:author", (req, res) => {
  const author = req.params.author;
  const bookByAuthor = Object.values(books).filter(
    (book) => book.author.toLowerCase() === author.toLowerCase()
  );

  if (!bookByAuthor.length) {
    return res
      .status(404)
      .send({ msg: `Books not found with this Author: ${author}` });
  }

  res.status(200).json(bookByAuthor);
});

// ++++++++++++++++++++ Task 4: Get all books based on Title ++++++++++++++++++++
router.get("/title/:title", (req, res) => {
  const title = req.params.title;
  const bookByTitle = Object.values(books).filter(
    (book) => book.title.toLowerCase() === title.toLowerCase()
  );

  if (!bookByTitle.length) {
    return res
      .status(404)
      .send({ msg: `Books not found with this Title: ${title}` });
  }

  res.status(200).json(bookByTitle);
});

// ++++++++++++++++++++ Task 5: Get book Review ++++++++++++++++++++
router.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const getBookReview = books[isbn];

  if (!getBookReview) {
    return res
      .status(404)
      .send({ msg: `Books not found with this ISBN: ${isbn}` });
  }
  res.status(200).json(getBookReview.reviews || {});
});

// ++++++++++++++++++++ Task 8: Add a book review ++++++++++++++++++++
router.post("/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { username, review } = req.body;

  if (!review) {
    return res.status(400).json({ error: "Review required." });
  }

  const registeredUser = users.find((u) => u.username === username);
  if (!registeredUser) {
    return res
      .status(401)
      .json({ error: "To write a review first register yourself." });
  }

  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ error: `Book not found with ISBN ${isbn}` });
  }

  if (!book.reviews) {
    book.reviews = {};
  }

  if (book.reviews[username]) {
    return res.status(400).json({
      error:
        "You have already added a review. Use modify endpoint to update it.",
    });
  }

  book.reviews[username] = review;

  res.status(200).json({
    message: "Review added successfully",
    book,
  });
});

// ++++++++++++++++++++ Task 8: Modify a book review ++++++++++++++++++++
router.put("/modify/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { username, review } = req.body;

  if (!username || !review) {
    return res.status(400).json({ error: "Username and Review are required" });
  }

  const registeredUser = users.find((u) => u.username === username);
  if (!registeredUser) {
    return res
      .status(401)
      .json({ error: "To modify a review, you must be a registered user." });
  }

  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ error: `Book not found with ISBN ${isbn}` });
  }

  if (!book.reviews) {
    book.reviews = {};
  }

  if (!book.reviews[username]) {
    return res.status(400).json({
      error:
        "You have not written a review for this book yet. Please add one first.",
    });
  }

  book.reviews[username] = review;

  res.status(200).json({
    message: "Review modified successfully",
    book,
  });
});

// ++++++++++++++++++++ Task 9: Delete book review added by that particular user ++++++++++++++++++++
router.delete("/delete/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const registeredUser = users.find((u) => u.username === username);
  if (!registeredUser) {
    return res
      .status(401)
      .json({ error: "To delete a review, you must be a registered user." });
  }

  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ error: `Book not found with ISBN ${isbn}` });
  }

  if (!book.reviews) {
    book.reviews = {};
  }

  if (!book.reviews[username]) {
    return res.status(400).json({
      error: "You have not written a review for this book yet.",
    });
  }

  delete book.reviews[username];

  return res.json({
    message: `Review deleted for book with ISBN ${isbn} by ${username}`,
  });
});

export default router;
