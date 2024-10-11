const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.post("/add-user", (req, res) => {
  const { name, email, phone, address, role } = req.body;

  const query = `
      INSERT INTO users (name, email, phone, address, role) 
      VALUES (?, ?, ?, ?, ?)
    `;

  db.query(query, [name, email, phone, address, role], (err, result) => {
    if (err) {
      console.error("Error inserting user details:", err);
      res.status(500).send("Failed to add user.");
    } else {
      res.send("User added successfully!");
    }
  });
});

router.put("/update-user/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email, phone, address, role } = req.body;

  const query = `
      UPDATE users SET name = ?, email = ?, phone = ?, address = ?, role = ?
      WHERE id = ?
    `;

  db.query(
    query,
    [name, email, phone, address, role, userId],
    (err, result) => {
      if (err) {
        console.error("Error updating user details:", err);
        res.status(500).send("Failed to update user.");
      } else {
        res.send("User details updated successfully!");
      }
    }
  );
});

router.get("/users", (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving users:", err);
      res.status(500).send("Failed to retrieve users.");
    } else {
      res.json(results);
    }
  });
});

router.get("/users/:id", (req, res) => {
  const userId = req.params.id;

  const query = "SELECT * FROM users WHERE id = ?";

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error retrieving user:", err);
      res.status(500).send("Failed to retrieve user.");
    } else if (result.length === 0) {
      res.status(404).send("User not found.");
    } else {
      res.json(result[0]);
    }
  });
});

module.exports = router;
