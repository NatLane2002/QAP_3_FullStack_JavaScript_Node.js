// routes/comments.js

const express = require("express");
const router = express.Router();
const db = require("../services/db");

// Get all comments
router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM comments");
        if (DEBUG) {
            // console.log(result.rows);
        }
        res.render("comments", { comments: result.rows });
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Display the form for creating a new comment
router.get("/new", (req, res) => {
    res.render("newComment");
});

// Create a new comment
router.post("/", async (req, res) => {
    const { postID, content } = req.body;
    try {
        if (DEBUG) {
            console.log("Creating comment with content: ", content);
        }
        const result = await db.query(
            "INSERT INTO comments (content) VALUES ($1) RETURNING *",
            [content]
        );
        res.redirect("/comments");
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Display the form for updating a comment
router.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    try {
        if (DEBUG) {
            console.log("Editing comment with id: ", id);
        }
        const result = await db.query("SELECT * FROM comments WHERE commentID = $1", [id]);
        if (DEBUG) {
            console.log(result.rows[0]);
        }
        res.render("editComment", { comment: result.rows[0] });
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Update a comment
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        if (DEBUG) {
            console.log("Updating comment with id: ", id);
        }
        const result = await db.query(
            "UPDATE comments SET content = $1 WHERE commentID = $2 RETURNING *",
            [content, id]
        );
        res.redirect("/comments");
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Display the form for deleting a comment
router.get("/:id/delete", async (req, res) => {
    const { id } = req.params;
    try {
        if (DEBUG) {
            console.log("Deleting comment with id: ", id);
        }
        const result = await db.query("SELECT * FROM comments WHERE commentID = $1", [id]);
        res.render("deleteComment", { comment: result.rows[0] });
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

// Delete a comment
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("DELETE FROM comments WHERE commentID = $1 RETURNING *", [id]);
        res.redirect("/comments");
    } catch (err) {
        console.error("Error executing query", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
