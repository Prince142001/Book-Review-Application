# 📚 Book Review Application

A simple Node.js and Express-based application for managing books and users, built as a practice project.

## 🚀 Features
- Add, view, update, and delete books
- User routes for handling user-related data
- Middleware for logging requests
- Modular folder structure for scalability

## 🛠️ Tech Stack
- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **JavaScript (ES Modules)** – Project scripting
- **Git** – Version control

## ⚙️ Installation & Usage

1. **Clone the repository**
git clone https://github.com/Prince142001/Book-Review-Application.git
cd Book-Review-Application

2. Install dependencies
  npm install
3. Run the server
   node index.js
   Server will run on http://localhost:8000

## 📝 API Endpoints
### Books
- GET /books → Get all books
- POST /books → Add a new book
- PUT /books/:id → Update a book
- DELETE /books/:id → Delete a book

### Users
- GET /users → Get all users
- POST /users → Add a new user

## 📌 Notes
Middleware logger.js logs all incoming requests.

Data is currently stored in in-memory JavaScript files, not a database.
