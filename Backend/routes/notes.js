const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser.js");
const { body } = require("express-validator");
const {
  fetchAllNotesHandler,
  createNotesHandler,
  updateNotesHandler,
  deleteNotesHandler,
} = require("../controllers/notesController.js");
// Route 1 Endpoints to FetchAllNotes using GET

router.get("/fetchAllNotes", fetchuser, fetchAllNotesHandler);

// Route 2 Endpoints to add Note using POST

router.post(
  "/addNote",
  fetchuser,
  [
    body("title", "enter a valid Title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  createNotesHandler
);

// Route 3 Endpoints to update note using PUT

router.put("/updateNote/:id", fetchuser, updateNotesHandler);

// Route 4 Endpoint to delete using DELETE
router.delete("/deleteNote/:id", fetchuser, deleteNotesHandler);

module.exports = router;
