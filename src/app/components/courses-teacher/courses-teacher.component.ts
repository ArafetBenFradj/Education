import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { CourseService } from 'src/app/services/course.service';
@Component({
  selector: 'app-courses-teacher',
  templateUrl: './courses-teacher.component.html',
  styleUrls: ['./courses-teacher.component.css']
})
export class CoursesTeacherComponent implements OnInit {
  title: string = "My Courses";
  text: string = "Our courses offer a good compromise between the continuous assessment favoured by some universities and the emphasis placed on final exams by others."
  user: any;
  idUser: any;
  courses: any = [];
  pageOfItems: Array<any>;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.user = this.decodeToken(sessionToken);
      console.log("here information Teacher", this.user);
      this.idUser = this.user.id;
    }
    this.courseService.getAllCoursesByTeacher(this.idUser).subscribe((response) => {
      this.courses = response.coursesByTeacher;
    });
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  updateCourses(T) {
    this.courses = T;
  }
  onChangePage(pageOfItems: Array<any>) {

    this.pageOfItems = pageOfItems;
  }
}
