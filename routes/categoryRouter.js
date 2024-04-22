const express = require("express");
const router = express.Router();

const categoryController = require("../controller/categoryController");

router.get("/:genre", categoryController.filterByGenre);

router.get("/", categoryController.categoryStoryDisplay);

module.exports = router;
