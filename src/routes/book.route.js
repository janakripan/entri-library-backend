const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");

// GET /books - Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// POST /books - Add new book
router.post("/", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ error: err.message }); // show real error
  }
});

// DELETE /books/:id - Delete by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: "Invalid book ID" });
  }
});

module.exports = router;
