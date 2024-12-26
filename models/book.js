const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  isbn: { type: String, unique: true, required: true },
  availableCopies: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (value) {
        if (this.borrowedCount > 10) {
          return value <= 100;
        }
        return true;
      },
      message:
        "Available copies cannot exceed 100 if the book has been borrowed more than 10 times.",
    },
  },
  borrowedCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Book", bookSchema);
