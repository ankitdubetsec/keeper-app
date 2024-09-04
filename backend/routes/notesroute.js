const express = require("express");
const router = express.Router();
const { Note } = require("../models/notemodel.js");
const Students = require("../models/StudentsData.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const fetchStudent = require("../middlewares/fetchStudent.js");
// import { getallnotes } from '../controllers/notes.js'
const {
  getallnotes,
  createnote,
  getnote,
  deletenote,
  updatenote,
} = require("../controllers/notes.js");

router.post("/", [], createnote);

router.post(
  "/createuser",
  [
    // Validations Using express-validator.
    body("name", "Enter a valid Name").isLength({ min: 2 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a 8 character password").isLength({ min: 8 }),
    // body('date_of_birth', 'Enter your DOB').exists,
    // body('country_name', 'Enter your country').exists,
    // body('uid', 'Enter your UID No.').exists,
    // body('cgpa', 'Enter your CGPA').exists,
    // body('degree', 'Enter your Degree').exists,
  ],
  async (req, res) => {
    // If there are errors, return the bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      toast.error("Enter correct credentials");
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether user with this Email already exists.
      let student = await Students.findOne({ email: req.body.email });
      if (student) {
        // toast.error('Email Already registered');
        return res
          .status(400)
          .json({ error: "User with this Email already exist" });
      }

      // Hashing Password.
      const salt = await bcrypt.genSalt();
      securePassword = await bcrypt.hash(req.body.password, salt);
      // Adding user to the Database.
      student = await Students.create({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: securePassword,
        address: req.body.address,
        date_of_birth: req.body.date_of_birth,
        country: req.body.country,
        gender: req.body.gender,
        college_name: req.body.college_name,
        uid: req.body.uid,
        cgpa: req.body.cgpa,
        degree: req.body.degree,
      });

      const data = {
        student: {
          id: student.id,
          name: student.name,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      console.log(authToken);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      // toast.error('Internal Server Error');
      res.status(500).send("Some Error Occured!!!");
    }
  }
);

router.post(
  "/loginuser",
  [
    // body('email', 'Enter a value Email').isEmail(),
    // body('password', 'Enter a value Email').exists()
  ],
  async (req, res) => {
    // If there are errors, return the bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      toast.error("Enter Correct Credentials");
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let student = await Students.findOne({ email });
      if (!student) {
        toast.error("Email not Registered, Please Signup");
        return res.status(400).json({ error: "Email not Registered" });
      }

      const comparePassword = await bcrypt.compare(password, student.password);
      if (!comparePassword) {
        toast.error("Incorrect Password");
        return res.status(400).json({ error: "Incorrect Password" });
      }

      const data = {
        student: {
          id: student.id,
          name: student.name,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ authToken });
      console.log("signed in");
    } catch (error) {
      console.log(error.message);
      toast.error("Internal Server Error");
      res.status(500).send("Some Error Occured");
    }
  }
);

router.patch("/:id", fetchStudent, updatenote);

router.get("/", [], getallnotes);

router.get("/:id", fetchStudent, getnote);

router.delete("/:id", [], deletenote);

module.exports = router;
