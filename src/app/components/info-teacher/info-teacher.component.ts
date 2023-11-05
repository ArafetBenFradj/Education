import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-info-teacher',
  templateUrl: './info-teacher.component.html',
  styleUrls: ['./info-teacher.component.css']
})
export class InfoTeacherComponent implements OnInit {
  title: string = "My Teachers";
  text: string = "Teachers are educators who guide and inspire students to learn and grow academically and personally. They impart knowledge and skills through lessons, fostering intellectual development."
  teacherId: any;
  teacher: any;
  teacherInfo: string;
  coursesByTeacher: any;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private courseService: CourseService) { }

  ngOnInit() {
    this.teacherId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getTeacherById(this.teacherId).subscribe((response) => {
      this.teacher = response.teacher;
      this.teacherInfo = this.teacher.firstName + " " + this.teacher.lastName;

    });
    this.courseService.getAllCoursesByTeacher(this.teacherId).subscribe((response) => {
      this.coursesByTeacher = response.coursesByTeacher;
    });
  }

}
