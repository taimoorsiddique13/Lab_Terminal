const Author = require("../models/author");

exports.addAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!author) throw new Error("Author not found");
    res.json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAuthorsWithBookLimitExceeded = async (req, res) => {
  try {
    const authors = await Author.find({}).populate("books");
    const exceededAuthors = authors.filter((author) => author.books.length > 5);
    res.json(exceededAuthors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
