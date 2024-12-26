const Borrower = require("../models/borrower");
const Book = require("../models/book");

exports.borrowBook = async (req, res) => {
  try {
    const { borrowerId, bookId } = req.body;
    const borrower = await Borrower.findById(borrowerId).populate(
      "borrowedBooks"
    );
    const book = await Book.findById(bookId);

    if (!borrower.canBorrowMore())
      throw new Error("Borrowing limit reached or overdue books present.");
    if (book.availableCopies <= 0)
      throw new Error("No available copies to borrow.");

    borrower.borrowedBooks.push(book._id);
    book.availableCopies -= 1;
    book.borrowedCount += 1;

    await borrower.save();
    await book.save();
    res.json({ borrower, book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { borrowerId, bookId } = req.body;
    const borrower = await Borrower.findById(borrowerId);
    const book = await Book.findById(bookId);

    borrower.borrowedBooks.pull(book._id);
    book.availableCopies += 1;

    await borrower.save();
    await book.save();
    res.json({ borrower, book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
