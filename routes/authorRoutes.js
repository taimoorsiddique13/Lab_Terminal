const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const Author = require("../models/author"); // Import the Author model

// Route to add a new author
router.post("/", authorController.addAuthor);

// Route to update an existing author by ID
router.put("/:id", authorController.updateAuthor);

// Route to fetch authors exceeding the book limit constraint
router.get(
  "/exceeding-limit",
  authorController.getAuthorsWithBookLimitExceeded
);

// Route to fetch all authors
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find({});
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to delete an author by ID
router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
