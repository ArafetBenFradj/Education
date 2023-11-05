const mongoose = require("mongoose");
// import module moongoose unique validators
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
  //All Commun Attributs
  firstName: String,
  lastName: String,
  tel: { type: String, unique: true },
  address: String,
  email : { type: String, unique: true },
  pwd: String,
  role: String,
  img: String,
  // Teacher spesifique  Attributs
  speciality : String,
  cv: String,
  status : String ,
  coursesTeacher : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  studentsTeacher : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  notesTeacher: [
    {
      idStudent: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
      idCourse: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      note: String, 
      mention : String,
    }, 
  ],
  evaluationsTeacher: [
    {
      idStudent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      idCourse: { type: mongoose.Schema.Types.ObjectId, ref: "Course"},
      evaluation: String, 
    },
  ],
  globalEvaluationsTeacher: [
    {
      idStudent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
      evaluation : String,  
    }],
  // Student spesifique  Attributs
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  coursesStudent : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  notesStudent: [
    {
      idTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
      idCourse: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      note: String, 
      mention : String,
    }, 
  ],
  evaluationsStudent: [
    {
      idTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      idCourse: { type: mongoose.Schema.Types.ObjectId, ref: "Course"},
      evaluation: String, 
    },
  ],

  globalEvaluationsStudent: [
    {
      idTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
      evaluation : String, 
    }],
  //parent Specifique Attributs
  numberOfChildren: Number,
  childrenArray: [{
    childFirstName: String,
    childLastName: String,
    childPhone: String
  }],
  childrens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
userSchema.plugin(uniqueValidator);
//affect userSchema to user Model Name
const user = mongoose.model("User", userSchema);
//export user
module.exports = user;