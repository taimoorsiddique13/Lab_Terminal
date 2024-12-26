const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const borrowerRoutes = require("./routes/borrowerRoutes");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/library");

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/borrowers", borrowerRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
