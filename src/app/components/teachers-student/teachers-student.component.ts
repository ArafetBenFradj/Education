import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode'; 

@Component({
  selector: 'app-teachers-student',
  templateUrl: './teachers-student.component.html',
  styleUrls: ['./teachers-student.component.css']
})
export class TeachersStudentComponent implements OnInit {
title : string="My Teachers";
text : string ="Teachers are educators who guide and inspire students to learn and grow academically and personally. They impart knowledge and skills through lessons, fostering intellectual development."
teachersByStudent : any ;
user : any ;
idStudent : any
  constructor(private userService : UserService) { }

  ngOnInit() {
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.user = this.decodeToken(sessionToken);
      this.idStudent=this.user.id;
    }
    this.userService.getAllTeachersFromStudent(this.idStudent).subscribe((response)=>{
this.teachersByStudent=response.teachersByStudent;
    });
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
}
