const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/all", (req, res) => {
  res.send("all");
});

router.get("/secret", authController.protect, (req, res) => {
  res.send(req.userId);
});

module.exports = router;
