const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, match: /^\S+@\S+\.\S+$/ },
  phoneNumber: { type: String, required: true, match: /^\+?\d{10,15}$/ },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

authorSchema.pre("save", function (next) {
  if (this.books.length > 5) {
    next(new Error("An author cannot be linked to more than 5 books."));
  } else {
    next();
  }
});

module.exports = mongoose.model("Author", authorSchema);
