const jwt = require('jsonwebtoken');
const Note = require('../models/notemodel');


fetchStudent = async(req, res, next) => {
    // Get the student from jwt token and add id to req object.
    const token = req.header('auth-token');
   // console.log(decoded)
    if (!token) {
        res.status(401).send({ error: "Please Authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.student = data.student;
        // const user = await Note.findOne({ user: decoded.student.id});

        // if (!user) {
        //     throw new Error();
        // }

        // req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please Authenticate using a valid token" });
    }
}

module.exports = fetchStudent;