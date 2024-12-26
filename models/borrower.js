const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  membershipActive: { type: Boolean, required: true },
  membershipType: {
    type: String,
    enum: ["Standard", "Premium"],
    required: true,
  },
  overdueBooks: { type: Boolean, default: false },
});

borrowerSchema.methods.canBorrowMore = function () {
  const limit = this.membershipType === "Premium" ? 10 : 5;
  return this.borrowedBooks.length < limit && !this.overdueBooks;
};

module.exports = mongoose.model("Borrower", borrowerSchema);
