const mongoose = require("mongoose");
// import module moongoose unique validators
const uniqueValidator = require("mongoose-unique-validator");
const courseSchema = mongoose.Schema({
  name: String,
  monthDuree: Number,
  HourDuree: Number,
  description: String,
  price: Number,
  imgCourse: String,
  idTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  studentsCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  notes: [
    {
      idTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
      idStudent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      note: String, 
      mention: String,
    }, 
  ],
  evaluations: [
    {
      idTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      idStudent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      evaluation: String, 
    },
  ],
});
courseSchema.plugin(uniqueValidator);
//affect courseSchema to user Model Name
const course = mongoose.model("Course", courseSchema);
//export user
module.exports = course;
