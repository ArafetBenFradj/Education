import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-single-student',
  templateUrl: './single-student.component.html',
  styleUrls: ['./single-student.component.css']
})
export class SingleStudentComponent implements OnInit {
  @Input() studentDetails: any;
  path: string;
  showEvaluationInput: boolean = false;
  showGlobalEvaluationInput: boolean = false;
  showNoteInput: boolean = false;
  formEvaluation: FormGroup;
  formNote: FormGroup;
  formGlobalEvaluation: FormGroup;
  evaluationForm: any = {};
  globalEvaluationForm: any = {};
  noteForm: any = {};
  user: any;
  idUser: any;
  idCourse: any;
  idStudent: any;
  successMessage: string | null = null;
  successMessageGlobalEvaluation: string | null = null;
  successMessageNote: string | null = null;
  allowGiveEvaluation: boolean = true;
  allowGiveGlobalEvaluation: boolean = true;
  allowGiveEvaluationCourse: boolean = true;
  allowGiveNote: boolean = true;
  allowGiveNoteCourse: boolean = true;
  allowGiveGlobalEvaluationTeacher: boolean = true;

  constructor(private router: Router, private userService: UserService, private activatedRoute: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit() {
    this.path = this.router.url;
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.user = this.decodeToken(sessionToken);
      this.idUser = this.user.id;
      console.log("id Teacher : ", this.idUser);

    }
    this.idCourse = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("this id course :", this.idCourse);
    const evaluationGiven = localStorage.getItem(`evaluationGiven_${this.studentDetails._id}`);
    const courseEvaluationGiven = localStorage.getItem(`courseEvaluationGiven_${this.idCourse}`);
    if (evaluationGiven === 'true' && courseEvaluationGiven === 'true') {
      this.showEvaluationInput = false;
      this.allowGiveEvaluation = false;
      this.allowGiveEvaluationCourse = false;
    }
    const noteGiven = localStorage.getItem(`noteGiven_${this.studentDetails._id}`);
    const courseNoteGiven = localStorage.getItem(`courseNoteGiven_${this.idCourse}`);
    if (noteGiven === 'true' && courseNoteGiven) {
      this.showNoteInput = false;
      this.allowGiveNote = false;
      this.allowGiveNoteCourse = false;
    }
    const GlobalEvaluationGiven = localStorage.getItem(`GlobalEvaluationGiven_${this.studentDetails._id}`);
    const teacherGlobalEvaluationGiven = localStorage.getItem(`teacherGlobalEvaluationGiven_${this.idUser}`);
    if (GlobalEvaluationGiven === 'true' && teacherGlobalEvaluationGiven) {
      this.showGlobalEvaluationInput = false;
      this.allowGiveGlobalEvaluation = false;
     this.allowGiveGlobalEvaluationTeacher=false;
    }
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  addEvaluationToCourse(idStudent: any) {
    this.courseService.addEvaluationToCourse(this.evaluationForm, this.idCourse, idStudent, this.idUser).subscribe((response) => {
      console.log("here response from BE", response.message);
      if (response.message == "1") {

        this.successMessage = 'Review added successfully.';
        localStorage.setItem(`evaluationGiven_${idStudent}`, 'true');
        localStorage.setItem(`courseEvaluationGiven_${this.idCourse}`, 'true');
        setTimeout(() => {
          this.successMessage = null;
          this.showEvaluationInput = false;
          this.allowGiveEvaluation = false;
          this.allowGiveEvaluationCourse = false;
        }, 2000);


      }
    });

  }
  addEvaluationToStudent(idStudent: any) {
    this.userService.addEvaluationToStudent(this.evaluationForm, idStudent, this.idCourse, this.idUser).subscribe((response) => {
      console.log("here response from BE", response.message);
      if (response.message == "1") {

        this.successMessage = 'Review added successfully.';
        localStorage.setItem(`evaluationGiven_${idStudent}`, 'true');
        localStorage.setItem(`courseEvaluationGiven_${this.idCourse}`, 'true');
        setTimeout(() => {
          this.successMessage = null;
          this.showEvaluationInput = false;
          this.allowGiveEvaluation = false;
          this.allowGiveEvaluationCourse = false;
        }, 2000);


      }
    });

  }
  addEvaluationToTeacher(idStudent: any) {

    this.userService.addEvaluationToTeacher(this.evaluationForm, this.idUser, idStudent, this.idCourse).subscribe((response) => {
      console.log("here response from BE", response.message);
      if (response.message == "1") {

        this.successMessage = 'Review added successfully.';
        localStorage.setItem(`evaluationGiven_${idStudent}`, 'true');
        localStorage.setItem(`courseEvaluationGiven_${this.idCourse}`, 'true');
        setTimeout(() => {
          this.successMessage = null;
          this.showEvaluationInput = false;
          this.allowGiveEvaluation = false;
          this.allowGiveEvaluationCourse = false;
        }, 2000);


      }
    });

  }
  addNoteToCourse(idStudent: any) {
    this.courseService.addNoteToCourse(this.noteForm, this.idCourse, idStudent, this.idUser).subscribe((response) => {
      console.log("here response from BE", response.message);
      if (response.message == "1") {

        this.successMessageNote = 'Note added successfully.';
        localStorage.setItem(`noteGiven_${idStudent}`, 'true');
        localStorage.setItem(`courseNoteGiven_${this.idCourse}`, 'true');
        setTimeout(() => {
          this.successMessageNote = null;
          this.showNoteInput = false;
          this.allowGiveNote = false;
          this.allowGiveNoteCourse = false;
        }, 2000);


      }
    });
  }
  addNoteToTeacher(idStudent: any) {
    this.userService.addNoteToTeacher(this.noteForm, this.idUser, idStudent, this.idCourse).subscribe((response) => {
      console.log("here response from BE", response.message);
      if (response.message == "1") {

        this.successMessageNote = 'Note added successfully.';
        localStorage.setItem(`noteGiven_${idStudent}`, 'true');
        localStorage.setItem(`courseNoteGiven_${this.idCourse}`, 'true');
        setTimeout(() => {
          this.successMessageNote = null;
          this.showNoteInput = false;
          this.allowGiveNote = false;
          this.allowGiveNoteCourse = false;
        }, 2000);


      }
    });
  }
  addNoteToStudent(idStudent: any) {
    this.userService.addNoteToStudent(this.noteForm, idStudent, this.idCourse, this.idUser).subscribe((response) => {
      console.log("here response from BE", response.message);
      if (response.message == "1") {

        this.successMessageNote = 'Note added successfully.';
        localStorage.setItem(`noteGiven_${idStudent}`, 'true');
        localStorage.setItem(`courseNoteGiven_${this.idCourse}`, 'true');
        setTimeout(() => {
          this.successMessageNote = null;
          this.showNoteInput = false;
          this.allowGiveNote = false;
          this.allowGiveNoteCourse = false;
        }, 2000);


      }

    });
  }
  addGlobalEvaluationToTeacher(idStudent : any){
    this.userService.addGlobalEvaluationToTeacher(this.globalEvaluationForm, this.idUser, idStudent).subscribe((response) => {
      console.log("here response from BE to Teacher", response.message);
      if (response.message == "1") {

        this.successMessageGlobalEvaluation = 'Review added successfully.';
        localStorage.setItem(`GlobalEvaluationGiven_${idStudent}`, 'true'); 
        localStorage.setItem(`teacherGlobalEvaluationGiven_${this.idUser}`, 'true');
        setTimeout(() => {
          this.successMessageGlobalEvaluation = null;
          this.showGlobalEvaluationInput = false;
          this.allowGiveGlobalEvaluation = false;
          this.allowGiveGlobalEvaluationTeacher=false ; 
        }, 2000);


      }
    });

  }
  addGlobalEvaluationToStudent(idStudent : any){
    this.userService.addGlobalEvaluationToStudent(this.globalEvaluationForm, idStudent,  this.idUser).subscribe((response) => {
      console.log("here response from BE to student", response.message);
      if (response.message == "1") {

        this.successMessageGlobalEvaluation = 'Review added successfully.';
        localStorage.setItem(`GlobalEvaluationGiven_${idStudent}`, 'true'); 
        localStorage.setItem(`teacherGlobalEvaluationGiven_${this.idUser}`, 'true');
        setTimeout(() => {
          this.successMessageGlobalEvaluation = null;
          this.showGlobalEvaluationInput = false;
          this.allowGiveGlobalEvaluation = false;
          this.allowGiveGlobalEvaluationTeacher=false ; 
        }, 2000);


      }
    });

  }
  onValidateClickEvaluation() {
    this.showEvaluationInput = true;
  }
  onValidateClickNote() {
    this.showNoteInput = true;
  }
  onValidateClickGlobalEvaluation() {
    this.showGlobalEvaluationInput = true;
  }
}
