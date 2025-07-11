require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/book.route")

const app = express();
app.use(express.json());
app.use("/books", bookRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));


app.get("/", (req, res) => {
  res.send("APIis working");
});

module.exports = app;
