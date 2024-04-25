const express = require("express");
const router = express.Router();

const accountController = require("../controller/accountController");
const AuthenticationController = require("../controller/AuthenticationController")

// ------------THAY ĐỔI THÔNG TIN USER-----------

router.post("/", accountController.updateAccount);

router.get("/", accountController.displayAccount);

router.post("/register" , AuthenticationController.register)
router.post("/logins" , AuthenticationController.login)

module.exports = router;
