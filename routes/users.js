const express = require("express");
const router = express.Router();
const db = require("../services/db");

// Get all users
router.get("/", async (req, res) => {
try {
    const result = await db.query("SELECT * FROM users");
    res.render("users", { users: result.rows });
} catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
}
});

// Display the form for creating a new user
router.get("/new", (req, res) => {
    res.render("newUser");
});

// Create a new user
router.post("/", async (req, res) => {
const { username, email, password } = req.body;
try {
    const result = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password]
    );
    res.redirect("/users");
} catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
}
});

// Display the form for updating a user
router.get("/:id/edit", async (req, res) => {
const { id } = req.params;
try {
    const result = await db.query("SELECT * FROM users WHERE userID = $1", [
    id,
    ]);
    res.render("users/edit", { user: result.rows[0] });
} catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
}
});

// Update a user
router.patch("/:id", async (req, res) => {
const { id } = req.params;
const { username, email, password } = req.body;
try {
    const result = await db.query(
      "UPDATE users SET username = $1, email = $2, password = $3 WHERE userID = $4 RETURNING *",
    [username, email, password, id]
    );
    res.redirect("/users");
} catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
}
});

// Delete a user
router.delete("/:id", async (req, res) => {
const { id } = req.params;
try {
    const result = await db.query(
      "DELETE FROM users WHERE userID = $1 RETURNING *",
    [id]
    );
    res.redirect("/users");
} catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
}
});

module.exports = router;