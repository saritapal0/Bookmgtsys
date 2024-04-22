const express = require("express");
const router = express.Router();
const service = require("../../services/books/books_services");
const ResponseManager = require("../../response/responseManager");


//Retrieve a list of all books.
//http://localhost:3000/api/books/getAllbooks/

router.get("/getAllbooks", async (req, res) => {
  const books = await service.getAllbooks();
  ResponseManager.sendSuccess(res,books);
  return;
});

//Retrieve details of a specific book by ID.
//http://localhost:3000/api/books/getbook/book_id

router.get("/getbook/:book_id", async (req,res) => {
  const books = await service.getbookById(req.params.book_id);
  if (books.length == 0) res.statusError(404).json("no record id:" + req.params.id);
  ResponseManager.sendSuccess(res,books);
});

//Add a new book to the database.
//http://localhost:3000/api/books/addbook/

router.post("/addbook", async (req, res) => {
 if (!req.body.book_name){
      return ResponseManager.statusError(502).sendError({ error: "book_name Required" });
  }
  if (!req.body.booktype) {
      return ResponseManager.statusError(502).sendError({ error: "booktype Required" });
  }
  if (!req.body.title) {
      return ResponseManager.statusError(502).sendError({ error: "title Required" });
  }
  if (!req.body.author) {
     return ResponseManager.statusError(502).sendError({ error: "author Required" });
  }
  if (!req.body.publication_year) {
      return ResponseManager.statusError(502).sendError({ error: "publication_year Required" });
  }
  if (!req.body.quality) {
   return ResponseManager.statusError(502).sendError({ error: "quality Required" });
}
if (!req.body.price) {
   return ResponseManager.statusError(502).sendError({ error: "price Required" });
}
 const affectedRows = await service.addbook(req.body)
 if (affectedRows == 0) ResponseManager.statusError(404).json("no record id:" + req.params.id);
 else ResponseManager.sendSuccess(res,"created successful");
});

//Update details of a specific book by ID.
//http://localhost:3000/api/books/updatebook/book_id

router.put("/updatebook/:book_id", async (req,res) => {
   if (!req.body.book_name) {
      return ResponseManager.statusError(502).sendError({ error: "book_name Required" });
  }
  if (!req.body.booktype) {
      return ResponseManager.statusError(502).sendError({ error: "booktype Required" });
  }
  if (!req.body.title) {
      return ResponseManager.statusError(502).sendError({ error: "title Required" });
  }
  if (!req.body.author) {
     return ResponseManager.statusError(502).sendError({ error: "author Required" });
  }
  if (!req.body.publication_year) {
      return ResponseManager.statusError(502).sendError({ error: "publication_year Required" });
  }
  if (!req.body.quality) {
   return ResponseManager.statusError(502).sendError({ error: "quality Required" });
}
if (!req.body.price) {
   return ResponseManager.statusError(502).sendError({ error: "price Required" });
}
 const affectedRows = await service.updatebook(req.body,req.params.book_id);
  if (affectedRows == 0) ResponseManager.statusError(404).json("no record id:" + req.params.id);
  else ResponseManager.sendSuccess(res,"updated successful");
});

//Delete a book from the database.
//http://localhost:3000/api/books/deletebook/book_id

router.delete("/deletebook/:book_id", async (req, res) => {
  const affectedRows = await service.deletebook(req.params.book_id);
  if (affectedRows == 0) ResponseManager.statusError(404).json("no record id:" + req.params.id);
  ResponseManager.sendSuccess(res,"delete successful");
});
module.exports = router;
