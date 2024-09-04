const mongoose = require("mongoose");
const Student = require("./StudentsData");
const noteschema = new mongoose.Schema({
  // title:{
  //     type:String,
  //     required:true,
  // },
  // content:{
  //     type:String,
  //     required:true,
  // }
  title: {
    type: String,
    // required: [true, "must provide name"],
    // maxlength:5,
  },
  // user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Student' // Reference to the Student model
  // },
  content: {
    type: String,
    // required: [true, "must provide content"],
  },
  due: {
    type: Date,
    // required: [true, "must provide content"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  isfav: {
    type: Boolean,
    default: false,
  },
});

const Note = mongoose.model("note", noteschema);
module.exports = Note;
