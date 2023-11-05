import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-student-admin',
  templateUrl: './display-student-admin.component.html',
  styleUrls: ['./display-student-admin.component.css']
})
export class DisplayStudentAdminComponent implements OnInit {
@Input() student : any ;
  constructor() { }

  ngOnInit() {
  }

}
