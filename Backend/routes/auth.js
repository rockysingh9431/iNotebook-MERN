const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const {
  createUserHandler,
  userLoginHandler,
  getLoggedInUserDetails,
} = require("../controllers/authController");

// Route1 // Create a User using POST "/api/auth/createuser".
let success = false;
router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  createUserHandler
);

// Route 2  Endpoint for login and Authentication///
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  userLoginHandler
);

/// Route 3 Get logged in user details

router.get("/getuser", fetchuser, getLoggedInUserDetails);
module.exports = router;
