import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-students-course-teacher',
  templateUrl: './students-course-teacher.component.html',
  styleUrls: ['./students-course-teacher.component.css']
})
export class StudentsCourseTeacherComponent implements OnInit {
  title: string = "My Students From";
  text: string = "";
  studentsByCourse: any;
  courseId: any;
  course: any = {};
  path : string ;
  constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute,private router :Router) { }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.courseService.getCourseById(this.courseId).subscribe((response) => {
      this.course = response.course;
    })
    this.courseService.getAllStudentsFromCourse(this.courseId).subscribe((response) => {
      this.studentsByCourse = response.studentsByCourse;
      console.log("list of students", this.studentsByCourse);

    });
  }

}
