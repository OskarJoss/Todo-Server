const express = require("express");
const todo = require("../controllers/todoController");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("Welcome");
});

//todos
router.get("/todos", todo.findAllByUser);
router.get("/todo/:id", todo.findOne);
router.post("/todo/add", todo.add);
router.put("/todo/edit/:id", todo.edit);
router.delete("/todo/delete/:id", todo.delete);

module.exports = router;
