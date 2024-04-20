const express = require("express");
const router = express.Router();
const service = require("../../services/books/books_services");



//Retrieve a list of all books.
//http://localhost:3000/api/books/getAllbooks/

router.get("/getAllbooks", async (req, res) => {
  const books = await service.getAllbooks();
  res.send(books);
});

//Retrieve details of a specific book by ID.
//http://localhost:3000/api/books/getbook/book_id

router.get("/getbook/:book_id", async (req, res) => {
  const books = await service.getbookById(req.params.book_id);
  if (books.length == 0) res.status(404).json("no record id:" + req.params.id);
  res.send(books);
});

//Add a new book to the database.
//http://localhost:3000/api/books/addbook/

router.post("/addbook", async (req, res) => {
 if (!req.body.book_name) {
      return res.status(502).send({ error: "book_name Required" });
  }
  if (!req.body.booktype) {
      return res.status(502).send({ error: "booktype Required" });
  }

  if (!req.body.title) {
      return res.status(502).send({ error: "title Required" });
  }
  if (!req.body.author) {
     return res.status(502).send({ error: "author Required" });
  }
  if (!req.body.publication_year) {
      return res.status(502).send({ error: "publication_year Required" });
  }
  if (!req.body.quality) {
   return res.status(502).send({ error: "quality Required" });
}
if (!req.body.price) {
   return res.status(502).send({ error: "price Required" });
}
     await service.addbook(req.body,);
  res.status(201).send("created successfully");
});

//Update details of a specific book by ID.
//http://localhost:3000/api/books/updatebook/book_id

router.put("/updatebook/:book_id", async (req, res) => {
   if (!req.body.book_name) {
      return res.status(502).send({ error: "book_name Required" });
  }
  if (!req.body.booktype) {
      return res.status(502).send({ error: "booktype Required" });
  }

  if (!req.body.title) {
      return res.status(502).send({ error: "title Required" });
  }
  if (!req.body.author) {
     return res.status(502).send({ error: "author Required" });
  }
  if (!req.body.publication_year) {
      return res.status(502).send({ error: "publication_year Required" });
  }
  if (!req.body.quality) {
   return res.status(502).send({ error: "quality Required" });
}
if (!req.body.price) {
   return res.status(502).send({ error: "price Required" });
}

  const affectedRows = await service.updatebook(req.body, req.params.book_id);
  if (affectedRows == 0) res.status(404).json("no record id:" + req.params.id);
  else res.send("updated successful");
});

//Delete a book from the database.
//http://localhost:3000/api/books/deletebook/book_id

router.delete("/deletebook/:book_id", async (req, res) => {
  const affectedRows = await service.deletebook(req.params.book_id);
  if (affectedRows == 0) res.status(404).json("no record id:" + req.params.id);
  res.send("delete successful");
});
module.exports = router;
