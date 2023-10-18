const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
const jwtSecret="HelloThisisRockySingh"
const fetchuser=require('../middleware/fetchuser')

// Route1 // Create a User using POST "/api/auth/createuser". 
let success=false;
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    // if error occurs send bad request
    const errors = validationResult(req); // Get validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // if email already exists
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Email already exists" })
        }
        const salt= await bcrypt.genSalt(10)
        const pass= await bcrypt.hash(req.body.password,salt)
        //Create a new user
        user = await User.create({
            name: req.body.name,
            password: pass,
            email: req.body.email
        })
//
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,jwtSecret)
        success=true;
        res.json({success,authToken})
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
});

// Route 2  Endpoint for login and Authentication///
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    // if error occurs s end bad request
    const errors = validationResult(req); // Get validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // if email already exists
    const  {email,password}=req.body
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json("Invalid user id or password")
        }
        const passwordCompare=bcrypt.compare(password,user.password)
        if(!passwordCompare)
        {
            return res.status(400).json("Invalid user id or password")
        }
        const payload={
            user:{
                id:user.id
            } 
        }
        const authToken=jwt.sign(payload,jwtSecret)
        success=true;
        res.json({success,authToken})
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
});

/// Route 3 Get logged in user details

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId=req.user.id
        const user=await User.findById(userId).select('-password')
        success=true;
        res.send(success,user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
});
module.exports = router