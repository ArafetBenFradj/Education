import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-courses-home',
  templateUrl: './courses-home.component.html',
  styleUrls: ['./courses-home.component.css']
})
export class CoursesHomeComponent implements OnInit {
  user: any;
  courses: any;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.user = this.decodeToken(sessionToken);
    }
    this.courseService.getAllCourses().subscribe((response) => {
      this.courses = response.courses
    });
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
}
