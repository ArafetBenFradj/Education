import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-students-teacher',
  templateUrl: './students-teacher.component.html',
  styleUrls: ['./students-teacher.component.css']
})
export class StudentsTeacherComponent implements OnInit {
title : string ="My All Students";
text : string ="Your School's Student Hub Empowering Education , Connecting Futures";
studentsTeacher : any;
user : any ; 
idUser : any ;
path : string ;
pageOfItems: Array<any>;
  constructor(private userService :UserService , private router :Router) { }

  ngOnInit() {
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.user = this.decodeToken(sessionToken);
      this.idUser=this.user.id;
    }
    this.userService.getAllStudentsByTeacher(this.idUser).subscribe((response)=>{
      this.studentsTeacher=response.studentsByTeacher;
    })
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  onChangePage(pageOfItems: Array<any>) {

    this.pageOfItems = pageOfItems;
  }
}
