import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})
export class TeachersTableComponent implements OnInit {
  teachers: any = [];
  title : string = "Edit Teacher";
  teacherById : any ={};
  cvImagePreviewTeacher: string ;
 photoImagePreviewTeacher: string ;
 allowGiveValidation: boolean = true;
 teacher : any ; 
 teachersValidationStatus: { [key: string]: boolean } = {};
 showButton: boolean = true;

  constructor(private userService: UserService , private router : Router) { }

  ngOnInit() {
    this.userService.getAllTeachers().subscribe((response) => {
      console.log("here teachers", response.teachers);
      this.teachers = response.teachers;
      this.teachersValidationStatus = {}; 
      this.teachers.forEach((teacher) => {
        const validationGiven = localStorage.getItem(`validationGiven_${teacher._id}`);
        this.teachersValidationStatus[teacher._id] = validationGiven === 'true';
        teacher.showButton = true; 
      });
    });

  }

  validateTeacherByAdmin(id: any) {
    this.userService.getTeacherById(id).subscribe((responseGetTeacher) => {
      this.teacher = responseGetTeacher.teacher;
      const validationGiven = localStorage.getItem(`validationGiven_${this.teacher._id}`);
  
      if (validationGiven === 'true') {
       
        this.teachersValidationStatus[this.teacher._id] = false;
       
      } else {
        this.userService.editStatusTeacher(responseGetTeacher.teacher).subscribe((responseEditStatus) => {
          if (responseEditStatus.teacherAfterSave) {
            
            localStorage.setItem(`validationGiven_${id}`, 'true');
            this.teachersValidationStatus[this.teacher._id] = false;
            this.showButton = false;
          }
          
        });
      }
    });
  }

  
  
  
  
  goToDisplay(id: any) {
    this.router.navigate([`infoCourse/${id}`]);

  }
  getTeacherById(id : any){
this.userService.getTeacherById(id).subscribe((response)=>{
  this.teacherById=response.teacher;
  this.cvImagePreviewTeacher=response.teacher.cv;
  this.photoImagePreviewTeacher=response.teacher.img;
});
  }
  deleteTeacher(id : any){
    this.userService.deleteTeacher(id).subscribe((responseDelete) => {
      console.log("here response from BE : ",responseDelete.message);
      
      if (responseDelete.message=="1") {
        this.userService.getAllTeachers().subscribe((responseGet) => {
          this.teachers= responseGet.teachers;
        });
    
      }
    
    });
  }

}
