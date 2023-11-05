import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-teacher-admin',
  templateUrl: './display-teacher-admin.component.html',
  styleUrls: ['./display-teacher-admin.component.css']
})
export class DisplayTeacherAdminComponent implements OnInit {
@Input() teacher : any ; 
  constructor() { }

  ngOnInit() {
  }

}
