const express = require("express");
const router = express.Router();
const passport = require('passport')

router.get("/", (req, res) => {
  res.sendFile('/public/index.html', {root: '.'})
  // res.json({
  //   message: "Social Media homepage!"
  // });
});

router.use("/api", require("./api/index"));

module.exports = router;
