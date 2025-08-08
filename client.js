import axios from "axios";

// ++++++++++++++++++++ Task 10: Get all books – Using async/await ++++++++++++++++++++
async function getAllBooks() {
  try {
    const res = await axios.get("http://localhost:8000/books");
    console.log("Task 10 - All Books:", res.data);
  } catch (err) {
    console.error(err.message);
  }
}

// ++++++++++++++++++++ Task 11: Search by ISBN – Using Promises ++++++++++++++++++++
function getBookByISBN(isbn) {
  axios
    .get(`http://localhost:8000/books/isbn/${isbn}`)
    .then((res) => console.log("Task 11 - Book by ISBN:", res.data))
    .catch((err) => console.error(err.message));
}

// ++++++++++++++++++++ Task 12: Search by Author – Using Promises ++++++++++++++++++++
function getBooksByAuthor(author) {
  axios
    .get(`http://localhost:8000/books/author/${encodeURIComponent(author)}`)
    .then((res) => console.log("Task 12 - Books by Author:", res.data))
    .catch((err) => console.error(err.message));
}

// ++++++++++++++++++++ Task 13: Search by Title – Using async/await ++++++++++++++++++++
async function getBooksByTitle(title) {
  try {
    const res = await axios.get(
      `http://localhost:8000/books/title/${encodeURIComponent(title)}`
    );
    console.log("Task 13 - Books by Title:", res.data);
  } catch (err) {
    console.error(err.message);
  }
}

// await getAllBooks();
// getBookByISBN("9780143128540");
// getBooksByAuthor("Yuval Noah Harari");
await getBooksByTitle("The Road");
