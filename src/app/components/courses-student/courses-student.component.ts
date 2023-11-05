import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-courses-student',
  templateUrl: './courses-student.component.html',
  styleUrls: ['./courses-student.component.css']
})
export class CoursesStudentComponent implements OnInit {
  title: string = "My Courses";
  text: string = "Our courses offer a good compromise between the continuous assessment favoured by some universities and the emphasis placed on final exams by others."
  courses: any;
  user : any ;
  idStudent : any ;
  pageOfItems: Array<any>;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
      let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.user = this.decodeToken(sessionToken);
      this.idStudent=this.user.id;
    }
    this.courseService.getAllCoursesFromStudent(this.idStudent).subscribe((response) => {
      console.log("here all courses", response.coursesByStudent);
      this.courses = response.coursesByStudent;
    });
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }
  onChangePage(pageOfItems: Array<any>) {

    this.pageOfItems = pageOfItems;
  }
}
