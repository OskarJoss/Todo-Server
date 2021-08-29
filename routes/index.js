const express = require("express");
//const controller = require("../controllers/controller")
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.user);
  res.json("Welcome");
});

module.exports = router;
