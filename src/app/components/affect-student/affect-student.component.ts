import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-affect-student',
  templateUrl: './affect-student.component.html',
  styleUrls: ['./affect-student.component.css']
})
export class AffectStudentComponent implements OnInit {
  @Input() teachers: any;
  @Input() student: any;
  @Input() showModal: boolean;
  @Output() newStudents: EventEmitter<any> = new EventEmitter();
  teacher: any;
  teacherId: any;
  courseId: any;
  courses: any = [];
  showCoursesList: boolean = false;
  showdivAffectation: boolean = true;
  errorCourse : string;
  errorTeacher : string;
  successCourse : string;
  successTeacher : string;
  constructor(private courseService: CourseService, private userService: UserService , private router : Router) { }

  ngOnInit() {
  }
  selectTeacherId(event) {
    console.log("here id teacher", event.target.value);
    this.teacherId = event.target.value;
    this.courseService.getAllCoursesByTeacher(this.teacherId).subscribe((response) => {
      this.courses = response.coursesByTeacher;
    });
    this.showCoursesList = false;
  }
  affectStudentInTeacher(idStudent: any) {
    this.userService.getTeacherById(this.teacherId).subscribe((responseGetTeacher) => {
      this.userService.affectStudentInTeacherByAdmin(responseGetTeacher, idStudent, this.teacherId).subscribe((responseAffect) => {
        if (responseAffect.message=="0") {
          this.errorCourse="";
          this.errorTeacher="This student is already affected at this teacher please check course";
         }  else{
          this.errorCourse="";
          this.errorTeacher="";
          this.successTeacher="Your student is affected succesfly in this teacher";
          this.successCourse="";
          this.userService.getAllStudents().subscribe((responseGetStudents)=>{
           this.newStudents.emit(responseGetStudents.students)
          });
         }
      });

    });


  }
  affectTeacherInstudent(student: any, idStudent: any) {
    this.userService.affectTeacherInStudentByAdmin(student, this.teacherId, idStudent).subscribe((response) => {
      if (response.message=="0") {
        
        this.errorCourse="";
        this.errorTeacher="This student is already affected at this teacher please check course";
       } else{
        this.errorCourse="";
        this.errorTeacher="";
        this.successTeacher="Your student is affected succesfly in this teacher";
        this.successCourse="";
        this.userService.getAllStudents().subscribe((responseGetStudents)=>{
          this.newStudents.emit(responseGetStudents.students)
         });
       }
    });
  }
  onValidateClick() {
    this.showCoursesList = true;
  }
  selectCourseId(event) {
    console.log("here id Course", event.target.value);
    this.courseId = event.target.value;
  
  }
  affectCourseInStudent(student : any,idStudent: any) {
      this.courseService.affectCourseInStudentByAdmin(student , this.courseId ,idStudent ).subscribe((response) => {
        if (response.message=="0") {
          this.errorCourse="this course is already affect at this children please select another Course";
          setTimeout(() => {
            this.errorCourse = null;
            this.closeModal();
            this.errorTeacher="";
          }, 2000);
         
       
         } else if (response.message=="1") 
         {
          this.successCourse="Your student is succesfly affected in this course"
          setTimeout(() => {
            this.successCourse = null;
            this.closeModal();
            this.successTeacher="";
          }, 2000);
          this.userService.getAllStudents().subscribe((responseGetStudents)=>{
            this.newStudents.emit(responseGetStudents.students)
           });
        
         }
      });
  }
  affectStudentInCourse(idStudent: any) {
    
    this.courseService.getCourseById(this.courseId).subscribe((responseGetCourse) => {
      this.courseService.affectStudentInCourseByAdmin(responseGetCourse, idStudent, this.courseId).subscribe((responseAffect) => {
       if (responseAffect.message=="0") {
        this.errorCourse="this course is already affect at this children please select another Course";
        setTimeout(() => {
          this.errorCourse = null;
          this.closeModal();
          this.errorTeacher="";
        }, 2000);
       } else if (responseAffect.message=="1"){
       this.successCourse="Your student is succesfly affected in this course"
        setTimeout(() => {
          this.successCourse = null;
          this.closeModal();
          this.successTeacher="";
        }, 2000);
        this.userService.getAllStudents().subscribe((responseGetStudents)=>{
          this.newStudents.emit(responseGetStudents.students)
         });
       }
      });

    });
  }
  closeModal() {
    const modal = document.getElementById('listOfTeacher');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('show');
      document.body.classList.remove('modal-open');
  
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  }

}
