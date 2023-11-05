import { Component, Input,Output,EventEmitter , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.css']
})
export class SingleCourseComponent implements OnInit {
@Input() courseDetails : any ;
@Output() newCourses: EventEmitter<any> = new EventEmitter();
user : any ;
studentsByCourse : any =[];
idStudent : any ;
teacherFirstName : any ;
teacherLastName : any ;
evaluationValue : any ;
noteValue : any ;
mentionValue : any ;
showEvaluationInput: boolean = false;
showNoteInput: boolean = false;
errorMsgEvaluation : string ;
errorMsgNote : string ;
path : string;
  constructor(private router :Router,private courseService : CourseService, private userService : UserService) { }

  ngOnInit() {
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.user = this.decodeToken(sessionToken);
      this.idStudent=this.user.id;
    }
this.path=this.router.url;


  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  goToDisplayEdit(id: any) {
    this.router.navigate([`editCourse/${id}`]);
  }
  goToDisplayCourse(id: any) {
    this.router.navigate([`infoCourse/${id}`]);
  }
  goToDisplayStudentsFromCourse(id: any) {
    this.router.navigate([`studentsFromCourse/${id}`]);
  }
  deleteCourse(id : any){
    this.courseService.deleteCourse(id).subscribe((responseDelete) => {
      if (responseDelete.message=="1") {
        this.courseService.getAllCourses().subscribe((responseGet) => {
          this.newCourses.emit(responseGet.courses);
        });
      }
    });
  }
  showEvaluationStudentFromCourse(idCourse : any){
 
  this.courseService.getEvaluationFromCourseByIdStudent(idCourse , this.idStudent).subscribe((response)=>{
  if (response.message) {
    this.evaluationValue=response.EvaluationFromCourseByIdStudent.evaluation ;
    this.userService.getTeacherById(response.EvaluationFromCourseByIdStudent.idTeacher).subscribe((responseGetTeacher)=>{
      this.teacherFirstName=responseGetTeacher.teacher.firstName;
      this.teacherLastName=responseGetTeacher.teacher.lastName;
      setTimeout(() => {
        this.showEvaluationInput = false;
      }, 5000);
      });
  } else {
    this.errorMsgEvaluation="You don't Have Review In this Course";
    this.showEvaluationInput = false;
    setTimeout(() => {
      this.errorMsgEvaluation=null ;
     
    },3000);
    
  }


  
});
  }
  showNoteStudentFromCourse(idCourse : any){
 
    this.courseService.getNoteFromCourseByIdStudent(idCourse , this.idStudent).subscribe((response)=>{
    if (response.message) {
      this.noteValue=response.noteFromCourseByIdStudent.note ;
      this.mentionValue=response.noteFromCourseByIdStudent.mention ;
      this.userService.getTeacherById(response.noteFromCourseByIdStudent.idTeacher).subscribe((responseGetTeacher)=>{
        this.teacherFirstName=responseGetTeacher.teacher.firstName;
        this.teacherLastName=responseGetTeacher.teacher.lastName;
        setTimeout(() => {
          this.showNoteInput = false;
        }, 5000);
        });
    } else {
      this.errorMsgNote="You don't Have Note In this Course";
      this.showNoteInput = false;
      setTimeout(() => {
        this.errorMsgNote=null ;
       
      },3000);
      
    }
  
  
    
  });
    }
  onValidateClickEvaluation() {
    this.showEvaluationInput = true;
  }
  onValidateClickNote() {
    this.showNoteInput = true;
  }
}
