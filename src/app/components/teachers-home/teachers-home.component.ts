import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers-home',
  templateUrl: './teachers-home.component.html',
  styleUrls: ['./teachers-home.component.css']
})
export class TeachersHomeComponent implements OnInit {
  teachersTab : any ;
  constructor(private userTeacherService : UserService) { }

  ngOnInit() {
    this.userTeacherService.getAllTeachers().subscribe((response)=>{
      this.teachersTab=response.teachers;
      });
  }

}
