import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css'],
})
export class StudentsTableComponent implements OnInit {
  students: any = [];
  title : string = "Edit Student";
  studentById : any ={};
  studentAffectTeacher :any={}
  teachersAdmin : any =[];
 photoImagePreviewStudent: string ;
 showAffectStudentModal: boolean = false;
  constructor(private userService: UserService , private router : Router) { }

  ngOnInit() {
    this.userService.getAllStudents().subscribe((response) => {
      console.log("her students :",response.students);
      this.students = response.students;
    });
  }
  goToDisplay(id: any) {
    this.router.navigate([`infoCourse/${id}`]);

  }
  getStudentById(id : any){
this.userService.getStudentById(id).subscribe((response)=>{
  this.studentById=response.student;
  this.photoImagePreviewStudent=response.student.img;
});
  }
  deleteStudent(id : any){
    this.userService.deleteStudent(id).subscribe((responseDelete) => {
      console.log("here response from BE : ",responseDelete.message);
      if (responseDelete.message=="1") {
        this.userService.getAllStudents().subscribe((responseGet) => {
          this.students= responseGet.students;
        });
    
      }
    
    });
  }
  getAllTeachers(id : any){
    this.userService.getAllTeachers().subscribe((response) =>{
      console.log("here list of teacher");
      this.teachersAdmin = response.teachers;
    });
    this.userService.getStudentById(id).subscribe((response)=>{
      this.studentAffectTeacher=response.student;
      console.log("studentAffectTeacher",this.studentAffectTeacher);
      
    });
  }
  updatestudents(T) {
    this.students = T;
  }
  openAffectStudentModal() {
    this.teachersAdmin = [];
    this.studentById = {};
    this.showAffectStudentModal = true; 
  }
}
