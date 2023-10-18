const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note.js')
const fetchuser = require('../middleware/fetchuser.js')

// Route 1 Endpoints to FetchAllNotes using GET

router.get('/fetchAllNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error)
        res.status(400).send({ error: "Internal server error" })
    }
});

// Route 2 Endpoints to add Note using POST

router.post('/addNote', fetchuser, [
    body('title', 'enter a valid Title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() })
        }
        const note = new Note({ title, description, tag, user: req.user.id })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal Server Error" })
    }
});

// Route 3 Endpoints to update note using PUT

router.put('/updateNote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // create a newNote Object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find note and update it according to update id
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal Server Error" })
    }
});

// Route 4 Endpoint to delete using DELETE
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
    try {
        // Find id and delete it by delete id
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note is deleted", note: note });
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal Server Error" })
    }
});

module.exports = router