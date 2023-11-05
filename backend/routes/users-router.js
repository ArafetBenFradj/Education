// import express module
const express = require("express");
//import bcrypt module
const bCrypt = require("bcrypt");
//import module json web session
const jwt = require("jsonwebtoken");
// //import module express session
const session = require("express-session");
//importation du module multer pour lire les fichier(image,video,audio)
const multer = require("multer");
const fs = require("fs");
//import module path (sans installation)
const path = require("path");
// Model Importation
const User = require("../models/user");
const Course = require("../models/course");
//instance router ..
const router = express.Router();
// // Session Configuration
const secretKey = "ABF 1920";
router.use(
  session({
    secret: secretKey,
  })
);
const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
};

// Configuration de Multer pour gérer le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Spécifiez le répertoire de destination pour chaque type de fichier
    if (file.fieldname === "cv") {
      cb(null, "backend/images/cv");
    } else if (file.fieldname === "img") {
      cb(null, "backend/images/img");
    }
  },
  filename: function (req, file, cb) {
    // Définissez le nom de fichier pour chaque fichier téléchargé
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName =
      name + "-" + Date.now() + "-themeEducation-" + "." + extension;
    cb(null, imgName);
  },
});
const upload = multer({ storage: storage });
// Business Logic : Signup (Add 4 Acteurs)
router.post(
  "/signup",
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  (req, res) => {
    if (req.body.role === "teacher") {
      try {
        // Vérifiez si les fichiers 'cv' et 'img' existent dans req.files
        if (req.files["cv"] && req.files["img"]) {
          // Récupérez les extensions des fichiers
          const cvExtension = path
            .extname(req.files["cv"][0].originalname)
            .toLowerCase();
          const imgExtension = path
            .extname(req.files["img"][0].originalname)
            .toLowerCase();

          if (
            cvExtension === ".pdf" &&
            [".png", ".jpeg", ".jpg"].includes(imgExtension)
          ) {
            bCrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
              req.body.pwd = cryptedPwd;

              if (req.files["cv"] && req.files["img"]) {
                const cvFileName = req.files["cv"][0].filename;
                const imgFileName = req.files["img"][0].filename;

                req.body.cv = `http://localhost:3000/images/cv/${cvFileName}`;
                req.body.img = `http://localhost:3000/images/img/${imgFileName}`;

                let user = new User(req.body);
                user.save((err, doc) => {
                  if (err) {
                    if (err.errors.email && !err.errors.tel) {
                      // only tel exist
                      res.json({ message: "00" });
                    } else if (err.errors.tel && !err.errors.email) {
                      // only email exist
                      res.json({ message: "01" });
                    } else if (err.errors.tel && err.errors.email) {
                      // email and tel exists
                      res.json({ message: "02" });
                    }
                  } else {
                    // success : create object
                    res.json({ message: "1" });
                  }
                });
              }
            });
          } else if (
            cvExtension != ".pdf" &&
            [".png", ".jpeg", ".jpg"].includes(imgExtension)
          ) {
            // response cv != pdf and img =.png,jpg and jbeg
            res.json({ message: "2" });
          } else if (
            cvExtension === ".pdf" &&
            ![".png", ".jpeg", ".jpg"].includes(imgExtension)
          ) {
            // response cv = pdf and img !=png,jpg and jbeg
            res.json({ message: "3" });
          } else if (
            cvExtension != ".pdf" &&
            ![".png", ".jpeg", ".jpg"].includes(imgExtension)
          ) {
            // response cv != pdf and img !=png,jpg and jbeg
            res.json({ message: "4" });
          }
        }
      } catch (error) {
        res.json({ message: "6" });
      }
    } else if (req.body.role === "parent") {
      const parentData = req.body;
      parentData.childrenArray = JSON.parse(parentData.childrenArray);
      const childPhoneNumbers = parentData.childrenArray.map(
        (child) => child.childPhone
      );
      // Vérifiez si les numéros de téléphone des enfants existent déjà dans la base de données
      User.find({ tel: { $in: childPhoneNumbers } }).then(
        (existingChildren) => {
          if (existingChildren.length !== childPhoneNumbers.length) {
            // Certains numéros de téléphone d'enfants n'existent pas dans la base de données
            return res.json({ message: "05" });
          }
          const parent = new User(parentData);
          // Ajoutez les _id des enfants à l'attribut "childrens" du parent
          parent.childrens = existingChildren.map((child) => child._id);
          bCrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
            req.body.pwd = cryptedPwd;
            const parent = new User(parentData);
            parent.save((err, doc) => {
              if (err) {
                if (err.errors.email && !err.errors.tel) {
                  // only tel exist
                  res.json({ message: "00" });
                } else if (err.errors.tel && !err.errors.email) {
                  // only email exist
                  res.json({ message: "01" });
                } else if (err.errors.tel && err.errors.email) {
                  // email and tel exists
                  res.json({ message: "02" });
                }
              } else {
                res.json({ message: "1" });
              }
            });
          });
        }
      );
    } else if (req.body.role === "student") {
      const imgExtension = path
        .extname(req.files["img"][0].originalname)
        .toLowerCase();
      if (
        imgExtension === ".png" ||
        imgExtension === ".jpg" ||
        imgExtension === ".jpeg"
      ) {
        console.log("Here into BL : Add Student ", req.body);
        bCrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
          req.body.pwd = cryptedPwd;
          req.body.img = `http://localhost:3000/images/img/${req.files["img"][0].filename}`;
          let user = new User(req.body);
          user.save((err, doc) => {
            if (err) {
              if (err.errors.email && !err.errors.tel) {
                // only tel exist
                res.json({ message: "00" });
              } else if (err.errors.tel && !err.errors.email) {
                // only email exist
                res.json({ message: "01" });
              } else if (err.errors.tel && err.errors.email) {
                // email and tel exists
                res.json({ message: "02" });
              }
            } else {
              res.json({ message: "1" });
            }
          });
        });
      } else {
        // msg img Student Invalid
        res.json({ message: "04" });
      }
    } else if (req.body.role === "admin") {
      bCrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
        req.body.pwd = cryptedPwd;
        let user = new User(req.body);
        user.save((err, doc) => {
          if (err) {
            if (err.errors.email && !err.errors.tel) {
              // only phone exist
              res.json({ message: "00" });
            } else if (err.errors.tel && !err.errors.email) {
              // only email exist
              res.json({ message: "01" });
            } else if (err.errors.tel && err.errors.email) {
              // email and tel exists
              res.json({ message: "02" });
            }
          } else {
            res.json({ message: "1" });
          }
        });
      });
    }
  }
);
// Business Logic : Login (Login for 4 Acteurs)
router.post("/login", (req, res) => {
  let user;
  User.findOne({ tel: req.body.tel })
    .then((doc) => {
      //
      if (!doc) {
        // send response "0" : check your tel
        // send response "1" : check your pwd
        // send response "2" : Welcome
        res.json({ msg: "0" });
        // User is founded by tel
      } else {
        user = doc;
        if (doc.role == "teacher") {
          if (doc.status == "NotOK") {
            res.json({ msg: "3" });
          } else {
            return bCrypt.compare(req.body.pwd, doc.pwd);
          }
        } else {
          // compare crypted pwd and req.body.pwd
          return bCrypt.compare(req.body.pwd, doc.pwd);
        }
      }
    })
    // get the result of bCrypt.compare
    .then((pwdResult) => {
      // pwd and cryptedPwd are  equals
      if (pwdResult) {
        let UserToSend = {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user._id,
          role: user.role,
        };
        const token = jwt.sign(UserToSend, secretKey, { expiresIn: "6h" });
        // send response 2 : Welcome to Our Site
        res.json({ msg: "2", token: token });
        // pwd and cryptedPwd are  NOT equals
      } else {
        // send response 3 : Please check your pwd
        res.json({ msg: "1" });
      }
    });
});
//
//
//
// Business Logic : Teachers
// Business Logic : Get All Teachers
router.get("/teachers", (req, res) => {
  User.find({ role: "teacher" })
    .populate({
      path: "coursesTeacher",
      select: "name",
    })
    .populate({
      path: "studentsTeacher",
      select: "firstName lastName",
    })
    .exec((err, teachers) => {
      if (err) {
        return res
          .status(500)
          .json({
            error:
              "Une erreur s'est produite lors de la récupération des informations des enseignants",
          });
      }

      const teachersInfo = teachers.map((teacher) => {
        const courses = teacher.coursesTeacher.map((course) => course.name);
        const students = teacher.studentsTeacher.map(
          (student) => `${student.firstName} ${student.lastName}`
        );

        return {
          _id: teacher._id,
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          email: teacher.email,
          tel: teacher.tel,
          address: teacher.address,
          speciality: teacher.speciality,
          img: teacher.img,
          courses: courses,
          students: students,
        };
      });

      res.json({ teachers: teachersInfo });
    });
});

// Business Logic : Get Teachers by speciality
router.post("/getTeachersBySpeciality", (req, res) => {
  const speciality = req.body.speciality;
  User.find({ speciality: speciality }).then((docs) => {
    if (docs.length > 0) {
      res.json({ teachersBySpeciality: docs, message: true });
    } else {
      res.json({ teachersBySpeciality: docs, message: false });
    }
  });
});
// Business Logic : Edit status Teacher By Admin
router.put("/teachers/status", (req, res) => {
  teacherId = req.body._id;
  newStatus = "OK";
  User.findById(teacherId, (err, teacher) => {
    teacher.status = newStatus;
    teacher.save((err, doc) => {
      res.json({ teacherAfterSave: doc });
    });
  });
});
// Business Logic : Update Teacher
router.put(
  "/editTeacher/:id",
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  (req, res) => {
    const updatedTeacher = {
      id: req.params.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      address: req.body.address,
      email: req.body.email,
      speciality: req.body.speciality,
      img: req.files["img"],
      cv: req.files["cv"],
    };

    if (req.files) {
      const cvFileName = req.files["cv"][0].filename;
      const imgFileName = req.files["img"][0].filename;
      updatedTeacher.img = `http://localhost:3000/images/img/${imgFileName}`;
      updatedTeacher.cv = `http://localhost:3000/images/cv/${cvFileName}`;
    }

    User.updateOne({ _id: updatedTeacher.id }, updatedTeacher).then(
      (updateResult) => {
        updateResult.nModified
          ? res.json({ teacherIsUpdated: true })
          : res.json({ teacherIsUpdated: false });
      }
    );
  }
);
// Business Logic: Delete Teacher by Id
router.delete("/deleteTeacher/:id", (req, res) => {
  const teacherId = req.params.id;

  // Supprimer les cours de l'enseignant
  Course.deleteMany({ idTeacher: teacherId }, (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Failed to delete teacher's courses" });
    }

    // Récupérer les étudiants qui ont l'enseignant dans leur tableau teachers
    User.find({ teachers: teacherId }, (err, students) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Failed to find students with teacher" });
      }

      // Supprimer les références de l'enseignant dans les étudiants
      User.updateMany(
        { teachers: teacherId },
        {
          $pull: {
            teachers: teacherId,
            coursesStudent: {
              $in: students.map((student) => student.coursesStudent),
            },
          },
        },
        (err) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Failed to remove teacher from students" });
          }

          // Supprimer les notes de l'enseignant dans les étudiants
          User.updateMany(
            { "notesStudent.idTeacher": teacherId },
            { $pull: { notesStudent: { idTeacher: teacherId } } },
            (err) => {
              if (err) {
                console.error(err);
                return res
                  .status(500)
                  .json({
                    error: "Failed to remove teacher's notes from students",
                  });
              }

              // Supprimer les évaluations de l'enseignant dans les étudiants
              User.updateMany(
                { "evaluationsStudent.idTeacher": teacherId },
                { $pull: { evaluationsStudent: { idTeacher: teacherId } } },
                (err) => {
                  if (err) {
                    console.error(err);
                    return res
                      .status(500)
                      .json({
                        error:
                          "Failed to remove teacher's evaluations from students",
                      });
                  }

                  // Supprimer les évaluations globales de l'enseignant dans les étudiants
                  User.updateMany(
                    { "globalEvaluationsStudent.idTeacher": teacherId },
                    {
                      $pull: {
                        globalEvaluationsStudent: { idTeacher: teacherId },
                      },
                    },
                    (err) => {
                      if (err) {
                        console.error(err);
                        return res
                          .status(500)
                          .json({
                            error:
                              "Failed to remove teacher's global evaluations from students",
                          });
                      }

                      // Supprimer les fichiers d'image et de CV de l'enseignant
                      User.findById(teacherId, (err, teacher) => {
                        const imgFileName = path.basename(teacher.img);
                        const imgFilePath = path.join(
                          __dirname,
                          "..",
                          "images",
                          "img",
                          imgFileName
                        );
                        const cvFileName = path.basename(teacher.cv);
                        const cvFilePath = path.join(
                          __dirname,
                          "..",
                          "images",
                          "cv",
                          cvFileName
                        );

                        fs.unlink(imgFilePath, (err) => {
                          if (err) {
                            console.error(err);
                            return res
                              .status(500)
                              .json({
                                error: "Failed to delete teacher's image file",
                              });
                          }

                          fs.unlink(cvFilePath, (err) => {
                            if (err) {
                              console.error(err);
                              return res
                                .status(500)
                                .json({
                                  error: "Failed to delete teacher's CV file",
                                });
                            }

                            // Si la suppression des fichiers est réussie, vous pouvez procéder à la suppression de l'enseignant
                            User.findByIdAndRemove(teacherId, (err) => {
                              if (err) {
                                console.error(err);
                                return res
                                  .status(500)
                                  .json({ error: "Failed to delete teacher" });
                              }

                              // Enseignant et données associées supprimés avec succès
                              return res.json({
                                message:
                                  "1",
                              });
                            });
                          });
                        });
                      });
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
// Business Logic : Get Teacher By ID
router.get("/teachers/getTeacherById/:id", (req, res) => {
  let id = req.params.id;
  User.findOne({ _id: id }).then((doc) => {
    res.json({ teacher: doc });
  });
});
// Business Logic : Add Evaluation to Teacher
router.post(
  "/addEvaluationToTeacher/:idTeacher/:idStudent/:idCourse",
  (req, res) => {
    const idTeacher = req.params.idTeacher;
    const idStudent = req.params.idStudent;
    const idCourse = req.params.idCourse;
    const evaluationContent = req.body.evaluation;
    User.findById(idTeacher, function (err, teacher) {
      if (!teacher) {
        //Teacher Not Found
        return res.json({ message: "0" });
      }
      const evaluation = {
        idStudent: idStudent,
        idCourse: idCourse,
        evaluation: evaluationContent,
      };
      teacher.evaluationsTeacher.push(evaluation);
      teacher.save(function (err) {
        //Evaluation Saved In Teacher
        res.json({ message: "1" });
      });
    });
  }
);
// Business Logic : Add Global Evaluation to Teacher
router.post(
  "/addGlobalEvaluationToTeacher/:idTeacher/:idStudent",
  (req, res) => {
    const idTeacher = req.params.idTeacher;
    const idStudent = req.params.idStudent;
    const evaluationContent = req.body.evaluation;
    User.findById(idTeacher, function (err, teacher) {
      if (!teacher) {
        //Teacher Not Found
        return res.json({ message: "0" });
      }
      const evaluation = {
        idStudent: idStudent,
        evaluation: evaluationContent,
      };
      teacher.globalEvaluationsTeacher.push(evaluation);
      teacher.save(function (err) {
        //Evaluation Saved In Teacher
        res.json({ message: "1" });
      });
    });
  }
);
// Business Logic : Add Note to Teacher
router.post("/addNoteToTeacher/:idTeacher/:idStudent/:idCourse", (req, res) => {
  const idTeacher = req.params.idTeacher;
  const idStudent = req.params.idStudent;
  const idCourse = req.params.idCourse;
  const noteContent = req.body.note;
  const mentionContent = req.body.mention;
  User.findById(idTeacher, function (err, teacher) {
    if (!teacher) {
      //Teacher Not Found
      return res.json({ message: "0" });
    }
    const note = {
      idStudent: idStudent,
      idCourse: idCourse,
      note: noteContent,
      mention: mentionContent,
    };
    teacher.notesTeacher.push(note);
    teacher.save(function (err) {
      //Evaluation Saved In Teacher
      res.json({ message: "1" });
    });
  });
});
// Business Logic : Get All Evaluations By Teacher
router.get("/getAllEvaluationsByTeacher/:id", (req, res) => {
  console.log("Here into BL: Get All Evaluations By Teacher");
  const teacherId = req.params.id;

  User.findById(teacherId)
    .populate("evaluationsTeacher")
    .then((teacher) => {
      const evaluations = teacher.evaluationsTeacher;

      const evaluationInfo = [];

      const getEvaluationInfo = (index) => {
        if (index < evaluations.length) {
          const evaluation = evaluations[index];
          User.findById(evaluation.idStudent).then((student) => {
            Course.findById(evaluation.idCourse).then((course) => {
              evaluationInfo.push({
                student: student,
                course: course,
                evaluation: evaluation,
              });
              getEvaluationInfo(index + 1);
            });
          });
        } else {
          res.json({ evaluationsByTeacher: evaluationInfo });
        }
      };

      getEvaluationInfo(0);
    });
});
// Business Logic : Get All Global Evaluations By Teacher
router.get("/getAllGlobalEvaluationsByTeacher/:id", (req, res) => {
  console.log("Here into BL: Get All Global Evaluations By Teacher");
  const teacherId = req.params.id;

  User.findById(teacherId)
    .populate("globalEvaluationsTeacher")
    .then((teacher) => {
      const evaluations = teacher.globalEvaluationsTeacher;

      const evaluationInfo = [];

      const getEvaluationInfo = (index) => {
        if (index < evaluations.length) {
          const evaluation = evaluations[index];
          User.findById(evaluation.idStudent).then((student) => {
            evaluationInfo.push({
              student: student,
              globalEvaluation: evaluation,
            });
            getEvaluationInfo(index + 1);
          });
        } else {
          res.json({ globalEvaluationsByTeacher: evaluationInfo });
        }
      };

      getEvaluationInfo(0);
    });
});
// Business Logic : Get All Notes By Teacher
router.get("/getAllNotesByTeacher/:id", (req, res) => {
  console.log("Here into BL: Get All Notes By Teacher");
  const teacherId = req.params.id;

  User.findById(teacherId)
    .populate("notesTeacher")
    .then((teacher) => {
      const notes = teacher.notesTeacher;

      const noteInfo = [];

      const getNoteInfo = (index) => {
        if (index < notes.length) {
          const note = notes[index];
          User.findById(note.idStudent).then((student) => {
            Course.findById(note.idCourse).then((course) => {
              noteInfo.push({
                student: student,
                course: course,
                note: note,
              });
              getNoteInfo(index + 1);
            });
          });
        } else {
          res.json({ notesByTeacher: noteInfo });
        }
      };

      getNoteInfo(0);
    });
});
// Business Logic : update Global Evaluation By Id
router.put("/editGlobalEvaluationById/:id/:idTeacher", (req, res) => {
  console.log("Here into BL: Update Global Evaluation By Id");

  const evaluationId = req.params.id;
  const teacherId = req.params.idTeacher;
  const newEvaluation = req.body.evaluation;
  User.findById(teacherId).then((teacher) => {
    User.updateOne(
      {
        _id: teacher._id,
        "globalEvaluationsTeacher._id": evaluationId,
      },
      {
        $set: {
          "globalEvaluationsTeacher.$.evaluation": newEvaluation,
        },
      }
    ).then(() => {
      return res.json({ message: "1" });
    });
  });
});
// Business Logic : update Evaluation By Id
router.put("/editEvaluation/:id/:idTeacher", (req, res) => {
  console.log("Here into BL: update Evaluation By Id");

  const evaluationId = req.params.id;
  const teacherId = req.params.idTeacher;
  const newEvaluation = req.body.evaluation;
  User.findById(teacherId).then((teacher) => {
    User.updateOne(
      {
        _id: teacher._id,
        "evaluationsTeacher._id": evaluationId,
      },
      {
        $set: {
          "evaluationsTeacher.$.evaluation": newEvaluation,
        },
      }
    ).then(() => {
      return res.json({ message: "1" });
    });
  });
});
// Business Logic : update Note By Id
router.put("/editNote/:id/:idTeacher", (req, res) => {
  console.log("Here into BL: update Note By Id");

  const noteId = req.params.id;
  const teacherId = req.params.idTeacher;
  const newNote = req.body.note;
  const newMention = req.body.mention;
  User.findById(teacherId).then((teacher) => {
    User.updateOne(
      {
        _id: teacher._id,
        "notesTeacher._id": noteId,
      },
      {
        $set: {
          "notesTeacher.$.note": newNote,
          "notesTeacher.$.mention": newMention,
        },
      }
    ).then(() => {
      return res.json({ message: "1" });
    });
  });
});
//
//
//
// Business Logic : Students
// Business Logic : Get All Students
router.get("/students", (req, res) => {
  console.log("Here into BL : Get All Students");
  User.find({ role: "student" })
    .populate({
      path: "teachers",
      select: "firstName lastName",
    })
    .populate({
      path: "coursesStudent",
      select: "name",
    })
    .exec((err, students) => {
      const studentsInfo = students.map((student) => {
        const courses = student.coursesStudent.map((course) => course.name);
        const teachers = student.teachers.map(
          (teacher) => `${teacher.firstName} ${teacher.lastName}`
        );

        return {
          _id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          tel: student.tel,
          address: student.address,
          img: student.img,
          courses: courses,
          teachers: teachers,
        };
      });

      res.json({ students: studentsInfo });
    });
});
// Business Logic : Get Student By ID
router.get("/students/getStudentById/:id", (req, res) => {
  console.log("Here into BL : Get Student By ID");
  let id = req.params.id;
  User.findOne({ _id: id }).then((doc) => {
    res.json({ student: doc });
  });
});
// Business Logic : Get All Student By Teacher
router.get("/getAllStudentsByTeacher/:id", (req, res) => {
  console.log("Here into BL : Get All Student By Teacher");
  User.findById(req.params.id)
    //find all courses in this teacher
    .populate("studentsTeacher")
    // teacher is not found
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.json({ studentsByTeacher: teacher.studentsTeacher });
    });
});
// Business Logic : Get All Teachers from Student
router.get("/getAllTeachersFromStudent/:idStudent", (req, res) => {
  console.log("Here into BL : Get All Teachers from Student");
  User.findById(req.params.idStudent)
    //find all teachers in this student
    .populate("teachers")
    // student is not found
    .then((student) => {
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json({ teachersByStudent: student.teachers });
    });
});
// Business Logic : Get Evaluation From Student By Id Teacher
router.get(
  "/getEvaluationFromStudentByIdTeacher/:idStudent/:idTeacher",
  (req, res) => {
    console.log("Here into BL:  Get Evaluation From Student By Id Teacher");
    const studentId = req.params.idStudent;
    const teacherId = req.params.idTeacher;
    User.findOne({ _id: studentId })
      .populate("globalEvaluationsStudent")
      .then((student) => {
        let globalEvaluation = null;
        if (student && student.globalEvaluationsStudent.length > 0) {
          for (let i = 0; i < student.globalEvaluationsStudent.length; i++) {
            if (student.globalEvaluationsStudent[i].idTeacher == teacherId) {
              globalEvaluation = student.globalEvaluationsStudent[i];
            }
          }
          if (!globalEvaluation) {
            res.json({
              evaluationFromStudentByIdTeacher: globalEvaluation,
              message: false,
            });
          } else {
            res.json({
              evaluationFromStudentByIdTeacher: globalEvaluation,
              message: true,
            });
          }
        } else {
          res.json({ message: false });
        }
      });
  }
);
// Business Logic : Update Student
router.put(
  "/editStudent/:id",
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  (req, res) => {
    const updatedStudent = {
      id: req.params.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      address: req.body.address,
      email: req.body.email,
      img: req.files["img"],
    };

    if (req.files) {
      const imgFileName = req.files["img"][0].filename;
      updatedStudent.img = `http://localhost:3000/images/img/${imgFileName}`;
    }

    User.updateOne({ _id: updatedStudent.id }, updatedStudent).then(
      (updateResult) => {
        updateResult.nModified
          ? res.json({ studentIsUpdated: true })
          : res.json({ studentIsUpdated: false });
      }
    );
  }
);
// Business Logic : Delete Student by Id
router.delete("/deleteStudent/:id", (req, res) => {
  const studentId = req.params.id;
  // Retrieve the student data to get the file name
  User.findById(studentId, (err, student) => {
    const imgFileName = path.basename(student.img);
    const imgFilePath = path.join(
      __dirname,
      "..",
      "images",
      "img",
      imgFileName
    );
    fs.unlink(imgFilePath, (err) => {
      if (err) {
        // If file deletion is unsuccessful, return an error message
        return res.json({ message: "Error deleting student image" });
      } else {
        // If file deletion is successful, proceed to delete the student and its related data
        // Delete the student from the teachers' students array
        User.updateMany(
          { _id: { $in: student.teachers } },
          { $pull: { studentsTeacher: studentId } },
          (err) => {
            if (err) {
              return res.json({ message: "Error deleting student" });
            } else {
              // Delete the student from the courses' students array
              Course.updateMany(
                { _id: { $in: student.coursesStudent } },
                { $pull: { studentsCourse: studentId } },
                (err) => {
                  if (err) {
                    return res.json({ message: "Error deleting student" });
                  } else {
                    // Delete the student's notes from the teachers' notesTeacher array
                    User.updateMany(
                      { _id: { $in: student.teachers } },
                      { $pull: { notesTeacher: { idStudent: student._id } } },
                      (err) => {
                        if (err) {
                          return res.json({
                            message: "Error deleting student",
                          });
                        } else {
                          // Delete the student's notes from the courses' notes array
                          Course.updateMany(
                            { _id: { $in: student.coursesStudent } },
                            { $pull: { notes: { idStudent: student._id } } },
                            (err) => {
                              if (err) {
                                return res.json({
                                  message: "Error deleting student",
                                });
                              } else {
                                // Delete the student's evaluations from the teachers' evaluationsTeacher array
                                User.updateMany(
                                  { _id: { $in: student.teachers } },
                                  {
                                    $pull: {
                                      evaluationsTeacher: {
                                        idStudent: student._id,
                                      },
                                    },
                                  },
                                  (err) => {
                                    if (err) {
                                      return res.json({
                                        message: "Error deleting student",
                                      });
                                    } else {
                                      User.updateMany(
                                        { _id: { $in: student.teachers } },
                                        {
                                          $pull: {
                                            globalEvaluationsTeacher: {
                                              idStudent: student._id,
                                            },
                                          },
                                        },
                                        (err) => {
                                          if (err) {
                                            return res.json({
                                              message: "Error deleting student",
                                            });
                                          } else {
                                      // Delete the student's evaluations from the courses' evaluations array
                                      Course.updateMany(
                                        { _id: { $in: student.coursesStudent } },
                                        {
                                          $pull: {
                                            evaluations: {
                                              idStudent: student._id,
                                            },
                                          },
                                        },
                                        (err) => {
                                          if (err) {
                                            return res.json({
                                              message: "Error deleting student",
                                            });
                                          } else {
                                            // Delete the student from the childrens' array of parent
                                            User.updateMany(
                                              { _id: { $in: student.parents } },
                                              {
                                                $pull: { childrens: student._id },
                                              },
                                              (err) => {
                                                if (err) {
                                                  return res.json({
                                                    message:
                                                      "Error deleting student",
                                                  });
                                                } else {
                                                  // Finally, delete the student
                                                  User.findByIdAndRemove(
                                                    studentId,
                                                    (err) => {
                                                      if (err) {
                                                        return res.json({
                                                          message:
                                                            "Error deleting student",
                                                        });
                                                      } else {
                                                        // Student and related data successfully deleted
                                                        return res.json({
                                                          message:
                                                            "1",
                                                        });
                                                      }
                                                    }
                                                  );
                                                }
                                              }
                                            );
                                          }
                                        }
                                      );
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    });
  }
});
});
});

// Business Logic : affect Student in Teacher
router.post(
  "/affectStudentInTeacherByAdmin/:idStudent/:idTeacher",
  (req, res) => {
    const userIdStudent = req.params.idStudent;
    const idTeacher = req.params.idTeacher;

    User.findById(userIdStudent)
      .populate("teachers")
      .exec(function (err, student) {
        const teacher = student.teachers.find(
          (teacher) => teacher._id.toString() === idTeacher
        );
        if (teacher) {
          res.json({ message: "0" });
        } else {
          student.teachers.push(idTeacher);
          student.save();
          res.json({ message: "1" });
        }
      });
  }
);
// Business Logic : affect Teacher in Student
router.post(
  "/affectTeacherInStudentByAdmin/:idTeacher/:idStudent",
  (req, res) => {
    const userIdTeacher = req.params.idTeacher;
    const idStudent = req.params.idStudent;

    User.findById(userIdTeacher)
      .populate("studentsTeacher")
      .exec(function (err, teacher) {
        const student = teacher.studentsTeacher.find(
          (student) => student._id.toString() === idStudent
        );
        if (student) {
          res.json({ message: "0" });
        } else {
          teacher.studentsTeacher.push(idStudent);
          teacher.save();
          res.json({ message: "1" });
        }
      });
  }
);
// Business Logic : Add Evaluation to Student
router.post(
  "/addEvaluationToStudent/:idStudent/:idCourse/:idTeacher",
  (req, res) => {
    const idTeacher = req.params.idTeacher;
    const idStudent = req.params.idStudent;
    const idCourse = req.params.idCourse;
    const evaluationContent = req.body.evaluation;
    User.findById(idStudent, function (err, student) {
      if (!student) {
        //Student Not Found
        return res.json({ message: "0" });
      }
      const evaluation = {
        idTeacher: idTeacher,
        idCourse: idCourse,
        evaluation: evaluationContent,
      };
      student.evaluationsStudent.push(evaluation);
      student.save(function (err) {
        //Evaluation Saved In Teacher
        res.json({ message: "1" });
      });
    });
  }
);
// Business Logic : Add Global Evaluation to Student
router.post(
  "/addGlobalEvaluationToStudent/:idStudent/:idTeacher",
  (req, res) => {
    const idTeacher = req.params.idTeacher;
    const idStudent = req.params.idStudent;
    const evaluationContent = req.body.evaluation;
    User.findById(idStudent, function (err, student) {
      if (!student) {
        //Student Not Found
        return res.json({ message: "0" });
      }
      const evaluation = {
        idTeacher: idTeacher,
        evaluation: evaluationContent,
      };
      student.globalEvaluationsStudent.push(evaluation);
      student.save(function (err) {
        //Evaluation Saved In Teacher
        res.json({ message: "1" });
      });
    });
  }
);
// Business Logic : Add Note to Student
router.post("/addNoteToStudent/:idStudent/:idCourse/:idTeacher", (req, res) => {
  const idTeacher = req.params.idTeacher;
  const idStudent = req.params.idStudent;
  const idCourse = req.params.idCourse;
  const noteContent = req.body.note;
  const mentionContent = req.body.mention;
  User.findById(idStudent, function (err, student) {
    if (!student) {
      //Student Not Found
      return res.json({ message: "0" });
    }
    const note = {
      idTeacher: idTeacher,
      idCourse: idCourse,
      note: noteContent,
      mention: mentionContent,
    };
    student.notesStudent.push(note);
    student.save(function (err) {
      //Evaluation Saved In Teacher
      res.json({ message: "1" });
    });
  });
});
// Business Logic : Parents
//Business Logic Get All Parents
router.get("/parents", (req, res) => {
  console.log("Here into BL : Get All Parents");
  User.find({ role: "parent" }).then((docs) => {
    res.json({ parents: docs });
  });
});
//Business Logic : Parent Search Evaluation by tel child
router.post("/searchEvaluationsAndNotesByTel/:idParent", (req, res) => {
  console.log("Here into BL : Parent Search Evaluation by tel child");
  const tel = req.body.PhoneChild;
  console.log("tel :", tel);
  const parentId = req.params.idParent;
  User.findOne({ _id: parentId }).then((parent) => {
    const childPhoneNumbers = parent.childrenArray.map(
      (child) => child.childPhone
    );
    let message;
    for (let i = 0; i < childPhoneNumbers.length; i++) {
      if (tel == childPhoneNumbers[i]) {
        message = true;
      } else {
        message = false;
      }
    }
    if (message) {
      Promise.all([
        User.findOne({ tel: tel })
          .populate({
            path: "notesStudent",
            populate: [
              { path: "idTeacher", select: "firstName lastName" },
              { path: "idCourse", select: "name" },
            ],
          })
          .exec(),
        User.findOne({ tel: tel })
          .populate({
            path: "globalEvaluationsStudent",
            populate: [{ path: "idTeacher", select: "firstName lastName" }],
          })
          .exec(),
        User.findOne({ tel: tel })
          .populate({
            path: "evaluationsStudent",
            populate: [
              { path: "idTeacher", select: "firstName lastName" },
              { path: "idCourse", select: "name" },
            ],
          })
          .exec(),
      ]).then(
        ([notesStudent, globalEvaluationsStudent, evaluationsStudent]) => {
          res.json({
            notesByTel: notesStudent.notesStudent,
            globalEvaluationsByTel:
              globalEvaluationsStudent.globalEvaluationsStudent,
            evaluationsByTel: evaluationsStudent.evaluationsStudent,
            msg: true,
          });
        }
      );
    } else {
      res.json({ msg: false });
    }
  });
});
// make router impotable from another files
module.exports = router;
