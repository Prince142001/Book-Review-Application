import express from "express";
import users from "../data/users.js";

const router = express.Router();

// ++++++++++++++++++++ Task 6: Register New user ++++++++++++++++++++
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and Password are required." });
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res
      .status(409)
      .json({ error: `User with ${username} already exists.` });
  }

  users.push({ username, password });
  res.status(201).json({ message: `${username}, thanks for registering.` });
});

// ++++++++++++++++++++ Task 7: Login as a Registered user ++++++++++++++++++++
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and Password are required." });
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  res.status(200).json({ message: "Login successful" });
});

export default router;
