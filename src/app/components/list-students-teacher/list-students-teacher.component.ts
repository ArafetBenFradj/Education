import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-students-teacher',
  templateUrl: './list-students-teacher.component.html',
  styleUrls: ['./list-students-teacher.component.css']
})
export class ListStudentsTeacherComponent implements OnInit {
@Input() students : any ;
  constructor() { }

  ngOnInit() {
  }

}
