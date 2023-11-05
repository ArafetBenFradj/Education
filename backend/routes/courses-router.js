// import express module
const express = require("express");
//importation du module multer pour lire les fichier(image,video,audio)
const multer = require("multer");
const fs = require("fs");
//import module path (sans installation)
const path = require("path");
// Model Importation
const Course = require("../models/course");
const User = require("../models/user");
//instance router ..
const router = express.Router();

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
//multer configuration : FileName and destination
const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images/imagesCourses");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, imgName);
  },
});
// Business Logic : Get All Courses
router.get("/", (req, res) => {
  console.log("Here into BL : Business Logic : Get All Courses");
  Course.find()
  .populate({
    path: "idTeacher",
    select: "firstName lastName",
  })
  .populate({
    path: "studentsCourse",
    select: "firstName lastName",
  })
  .exec((err , courses) => {
    if (err) {
      return res
        .status(500)
        .json({
          error:
            "error in courses",
        });
    }
    const coursesInfo = courses.map((course) => {
      const teacher = course.idTeacher? `${course.idTeacher.firstName} ${course.idTeacher.lastName}` : '';
      const students = course.studentsCourse.map(
        (student) => `${student.firstName} ${student.lastName}`
      );

      return {
        _id: course._id,
        name: course.name,
        monthDuree: course.monthDuree,
        HourDuree: course.HourDuree,
        description: course.description,
        price: course.price,
        imgCourse: course.imgCourse,
        teacher: teacher,
        students: students,
      };
    });

    res.json({ courses: coursesInfo });
  });
});
// Business Logic : Get Course By ID
router.get("/getCourseById/:id", (req, res) => {
  console.log("Here into BL : Get Course By ID");
  let id = req.params.id;
  Course.findOne({ _id: id }).then((doc) => {
    res.json({ course: doc });
  });
});
// Business Logic : Get All Courses By Teacher
router.get("/getAllCoursesByTeacher/:id", (req, res) => {
  console.log("Here into BL : Get All Courses By Teacher");
  User.findById(req.params.id)
    //find all courses in this teacher
    .populate("coursesTeacher")
    // teacher is not found
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.json({ coursesByTeacher: teacher.coursesTeacher });
    });
});
// Business Logic : Get All Courses From Student
router.get("/getAllCoursesFromStudent/:id", (req, res) => {
  console.log("Here into BL : Get All Courses From Student");
  User.findById(req.params.id)
    //find all courses in this teacher
    .populate("coursesStudent")
    // teacher is not found
    .then((student) => {
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json({ coursesByStudent: student.coursesStudent });
    });
});
// Business Logic : Get All Student By Course
router.get("/getAllStudentsFromCourse/:id", (req, res) => {
  console.log("Here into BL : Get All Student By Course");
  Course.findById(req.params.id)
    //find all courses in this teacher
    .populate("studentsCourse")
    // teacher is not found
    .then((course) => {
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json({ studentsByCourse: course.studentsCourse });
    });
});
// Business Logic : Get Evaluation From Course By Id Student
router.get(
  "/getEvaluationfromCourseByIdStudent/:idCourse/:idStudent",
  (req, res) => {
    console.log("Here into BL:  Get Evaluation From Course By Id Student");
    const courseId = req.params.idCourse;
    Course.findOne({ _id: courseId })
      .populate("evaluations")
      .then((course) => {
        if (course && course.evaluations.length > 0) {
          for (let i = 0; i < course.evaluations.length; i++) {
            if (course.evaluations[i].idStudent == req.params.idStudent) {
              evaluation = course.evaluations[i];
            }
          }
          if (evaluation && evaluation.length == 0) {
            res.json({
              EvaluationFromCourseByIdStudent: evaluation,
              message: false,
            });
          } else {
            res.json({
              EvaluationFromCourseByIdStudent: evaluation,
              message: true,
            });
          }
        } else {
          res.json({ message: false });
        }
      });
  }
);
// Business Logic : Get Note From Course By Id Student
router.get("/getNoteFromCourseByIdStudent/:idCourse/:idStudent", (req, res) => {
  console.log("Here into BL:  Get Note From Course By Id Student");
  const courseId = req.params.idCourse;
  Course.findOne({ _id: courseId })
    .populate("notes")
    .then((course) => {
      if (course && course.notes.length > 0) {
        for (let i = 0; i < course.notes.length; i++) {
          if (course.notes[i].idStudent == req.params.idStudent) {
            note = course.notes[i];
          }
        }
        if (note && note.length == 0) {
          res.json({ noteFromCourseByIdStudent: note, message: false });
        } else {
          res.json({ noteFromCourseByIdStudent: note, message: true });
        }
      } else {
        res.json({ message: false });
      }
    });
});
// Business Logic : Get Teacher Info From Course
router.get("/getTeacherInfoFromCourse/:idCourse", (req, res) => {
  console.log("Here into BL: Get Teacher Info From Course");
  const courseId = req.params.idCourse;
  Course.findOne({ _id: courseId })
    .populate("idTeacher")
    .then((course) => {
      const teacher = course.idTeacher;
      res.json({ teacherInfo: teacher });
    });
});
// Business Logic : Get Related Course By Speciality
router.get("/getRelatedCoursBySpeciality/:speciality/:idCourse", (req, res) => {
  console.log("Here into BL: Get Related Course By Speciality");
  const speciality = req.params.speciality;
  const idCourse = req.params.idCourse;
  User.find({ speciality: speciality })
    .populate("coursesTeacher")
    .then((teachers) => {
      const courses = teachers.reduce((acc, teacher) => {
        acc.push(...teacher.coursesTeacher);
        return acc;
      }, []);
      const relatedCourses = courses.filter(
        (course) => course._id.toString() !== idCourse
      );
      res.json({ relatedCourses: relatedCourses });
    });
});
// Business Logic : Add Course
router.post(
  "/addCourse",
  multer({ storage: storageConfig }).single("img"),
  (req, res) => {
    req.body.imgCourse = `http://localhost:3000/images/imagesCourses/${req.file.filename}`;
    const imgExtension = path.extname(req.file.originalname).toLowerCase();
    if (
      imgExtension === ".png" ||
      imgExtension === ".jpg" ||
      imgExtension === ".jpeg"
    ) {
      User.findById(req.body.idTeacher).then((teacher) => {
        if (!teacher) {
          return res.json({ message: "0" });
        }

        const course = new Course({
          name: req.body.name,
          monthDuree: req.body.monthDuree,
          HourDuree: req.body.HourDuree,
          description: req.body.description,
          price: req.body.price,
          idTeacher: teacher._id,
          imgCourse: req.body.imgCourse,
        });
        course.save((err, doc) => {
          teacher.coursesTeacher.push(course);
          teacher.save();
          res.json({ message: "1" });
        });
      });
    } else {
      // Format Image Not Compatible
      res.json({ message: "2" });
    }
  }
);
// Business Logic : Update Course
router.put(
  "/editCourse/:id",
  multer({ storage: storageConfig }).single("img"),
  (req, res) => {
    const updatedCourse = {
      id: req.params.id,
      name: req.body.name,
      monthDuree: req.body.monthDuree,
      HourDuree: req.body.HourDuree,
      description: req.body.description,
      price: req.body.price,
      imgCourse: req.file,
    };
    if (req.file) {
      updatedCourse.imgCourse = `http://localhost:3000/images/imagesCourses/${req.file.filename}`;
    }

    Course.updateOne({ _id: updatedCourse.id }, updatedCourse).then(
      (updateResult) => {
        updateResult.nModified
          ? res.json({ courseIsUpdated: true })
          : res.json({ courseIsUpdated: false });
      }
    );
  }
);
// Business Logic : Delete Course by Id
router.delete("/deleteCourse/:id", (req, res) => {
  const courseId = req.params.id;

  // Retrieve the course data to get the file name
  Course.findById(courseId, (err, course) => {
    const fileName = path.basename(course.imgCourse);
    const filePath = path.join(__dirname, "..", "images", "imagesCourses", fileName);

    // Delete the course file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete course file" });
      }

      // Delete the course
      Course.findByIdAndRemove(courseId, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to delete course" });
        }

        // Delete the course references in user documents
        User.updateMany(
          { $or: [{ coursesTeacher: courseId }, { coursesStudent: courseId }] },
          { $pull: { coursesTeacher: courseId, coursesStudent: courseId } },
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "Failed to delete course references in user documents" });
            }

            // Delete the course references in notesStudent and notesTeacher arrays
            User.updateMany(
              { $or: [{ "notesStudent.idCourse": courseId }, { "notesTeacher.idCourse": courseId }] },
              { $pull: { notesStudent: { idCourse: courseId }, notesTeacher: { idCourse: courseId } } },
              (err) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ error: "Failed to delete course references in notes arrays" });
                }

                // Delete the course references in evaluationsStudent and evaluationsTeacher arrays
                User.updateMany(
                  { $or: [{ "evaluationsStudent.idCourse": courseId }, { "evaluationsTeacher.idCourse": courseId }] },
                  { $pull: { evaluationsStudent: { idCourse: courseId }, evaluationsTeacher: { idCourse: courseId } } },
                  (err) => {
                    if (err) {
                      console.error(err);
                      return res.status(500).json({ error: "Failed to delete course references in evaluations arrays" });
                    }

                    // Delete the course references in globalEvaluationsStudent and globalEvaluationsTeacher arrays
                    User.updateMany(
                      { $or: [{ "globalEvaluationsStudent.idCourse": courseId }, { "globalEvaluationsTeacher.idCourse": courseId }] },
                      { $pull: { globalEvaluationsStudent: { idCourse: courseId }, globalEvaluationsTeacher: { idCourse: courseId } } },
                      (err) => {
                        if (err) {
                          console.error(err);
                          return res.status(500).json({ error: "Failed to delete course references in global evaluations arrays" });
                        }

                        // Course and related data successfully deleted
                        return res.json({ message: "1" });
                      }
                    );
                  }
                );
              }
            );
          }
        );
      });
    });
  });
});

// Business Logic : affect Course in student
router.post(
  "/affectCourseInStudentByAdmin/:idCourse/:idStudent",
  (req, res) => {
    const IdCourse = req.params.idCourse;
    const idStudent = req.params.idStudent;
    Course.findById(IdCourse)
      .populate("studentsCourse")
      .exec(function (err, course) {
        const student = course.studentsCourse.find(
          (student) => student._id.toString() === idStudent
        );
        if (student) {
          res.json({ message: "0" });
        } else {
          course.studentsCourse.push(idStudent);
          course.save();
          res.json({ message: "1" });
        }
      });
  }
);
// Business Logic : affect  Student in Course
router.post(
  "/affectStudentInCourseByAdmin/:idStudent/:idCourse",
  (req, res) => {
    const IdCourse = req.params.idCourse;
    const idStudent = req.params.idStudent;
    User.findById(idStudent)
      .populate("coursesStudent")
      .exec(function (err, student) {
        const course = student.coursesStudent.find(
          (course) => course._id.toString() === IdCourse
        );
        if (course) {
          res.json({ message: "0" });
        } else {
          student.coursesStudent.push(IdCourse);
          student.save();
          res.json({ message: "1" });
        }
      });
  }
);
// Business Logic : Add Evaluation to Course
router.post(
  "/addEvaluationToCourse/:idCourse/:idStudent/:idTeacher",
  (req, res) => {
    const idTeacher = req.params.idTeacher;
    const idStudent = req.params.idStudent;
    const idCourse = req.params.idCourse;
    const evaluationContent = req.body.evaluation;
    Course.findById(idCourse, function (err, course) {
      if (!course) {
        //Course Not Found
        return res.json({ message: "0" });
      }
      const evaluation = {
        idTeacher: idTeacher,
        idStudent: idStudent,
        evaluation: evaluationContent,
      };
      course.evaluations.push(evaluation);
      course.save(function (err) {
        //Evaluation Saved
        res.json({ message: "1" });
      });
    });
  }
);
// Business Logic : Add Note to Course
router.post("/addNoteToCourse/:idCourse/:idStudent/:idTeacher", (req, res) => {
  const idTeacher = req.params.idTeacher;
  const idStudent = req.params.idStudent;
  const idCourse = req.params.idCourse;
  const noteContent = req.body.note;
  const mentionContent = req.body.mention;
  Course.findById(idCourse, function (err, course) {
    if (!course) {
      //Course Not Found
      return res.json({ message: "0" });
    }
    const note = {
      idTeacher: idTeacher,
      idStudent: idStudent,
      note: noteContent,
      mention: mentionContent,
    };
    course.notes.push(note);
    course.save(function (err) {
      //Evaluation Saved
      res.json({ message: "1" });
    });
  });
});
// make router impotable from another files
module.exports = router;
