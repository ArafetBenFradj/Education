import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-info-course',
  templateUrl: './info-course.component.html',
  styleUrls: ['./info-course.component.css']
})
export class InfoCourseComponent implements OnInit {
  courseId: any;
  findedCourse: any = {};
  title: string = "Our Courses"
  text: string = "Our courses offer a good compromise between the continuous assessment favoured by some universities and the emphasis placed on final exams by others."
  teacherInfoImg: any;
  teacherInfoFirstName: any;
  teacherInfoLastName: any;
  teacherInfoSpeciality: any;
  relatedCourses: any;
  constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.courseService.getCourseById(this.courseId).subscribe((response) => {
      this.findedCourse = response.course;
    });
    this.courseService.getTeacherInfoFromCourse(this.courseId).subscribe((responseGetTeacherInfo) => {
      this.teacherInfoImg = responseGetTeacherInfo.teacherInfo.img;
      this.teacherInfoFirstName = responseGetTeacherInfo.teacherInfo.firstName;
      this.teacherInfoLastName = responseGetTeacherInfo.teacherInfo.lastName;
      this.teacherInfoSpeciality = responseGetTeacherInfo.teacherInfo.speciality;
      this.courseService.getRelatedCoursBySpeciality(this.teacherInfoSpeciality, this.courseId).subscribe((responseRelatedCourses) => {
        console.log("here response from BE", responseRelatedCourses.relatedCourses);
        this.relatedCourses = responseRelatedCourses.relatedCourses
      });
    });
  }

}
