const express = require("express");
const router = express.Router();
const db = require("../services/db");

// Get all posts
router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM posts");
        if (DEBUG) {
            // console.log(result.rows);
        }
        res.render("posts", { posts: result.rows });
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Display the form for creating a new post
router.get("/new", (req, res) => {
    res.render("newPost");
});

// Create a new post
router.post("/", async (req, res) => {
    const { userID, title, content } = req.body;
    try {
        if (DEBUG) {
            console.log("Creating post with title: ", title);
        }
        const result = await db.query(
            "INSERT INTO posts (userID, title, content) VALUES ($1, $2, $3) RETURNING *",
            [userID, title, content]
        );
        res.redirect("/posts");
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Display the form for updating a post
router.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    try {
        if (DEBUG) {
            console.log("Editing post with id: ", id);
        }
        const result = await db.query("SELECT * FROM posts WHERE postID = $1", [id]);
        if (DEBUG) {
            console.log(result.rows[0]);
        }
        res.render("postEdit", { post: result.rows[0] });
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Update a post
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        if (DEBUG) {
            console.log("Updating post with id: ", id);
        }
        const result = await db.query(
            "UPDATE posts SET title = $1, content = $2 WHERE postID = $3 RETURNING *",
            [title, content, id]
        );
        res.redirect("/posts");
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Display the form for deleting a post
router.get("/:id/delete", async (req, res) => {
    const { id } = req.params;
    try {
        if (DEBUG) {
            console.log("Deleting post with id: ", id);
        }
        const result = await db.query("SELECT * FROM posts WHERE postID = $1", [id]);
        res.render("postDelete", { post: result.rows[0] });
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Delete a post
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("DELETE FROM posts WHERE postID = $1 RETURNING *", [id]);
        res.redirect("/posts");
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
