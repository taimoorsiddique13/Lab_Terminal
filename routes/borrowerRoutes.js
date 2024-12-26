const express = require("express");
const router = express.Router();
const borrowerController = require("../controllers/borrowerController");

// Route to add a new borrower
router.post("/", async (req, res) => {
  try {
    const Borrower = require("../models/borrower");
    const borrower = new Borrower(req.body);
    await borrower.save();
    res.status(201).json(borrower);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to update an existing borrower by ID
router.put("/:id", async (req, res) => {
  try {
    const Borrower = require("../models/borrower");
    const borrower = await Borrower.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!borrower) throw new Error("Borrower not found");
    res.json(borrower);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to delete a borrower by ID
router.delete("/:id", async (req, res) => {
  try {
    const Borrower = require("../models/borrower");
    await Borrower.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const borrowers = await Borrower.find({}).populate("borrowedBooks");
    res.json(borrowers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Route to borrow a book
router.post("/borrow", borrowerController.borrowBook);

// Route to return a book
router.post("/return", borrowerController.returnBook);

module.exports = router;
