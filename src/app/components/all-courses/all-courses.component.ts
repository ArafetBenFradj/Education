import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {
  title: string = "Our Courses";
  text: string = "Our courses offer a good compromise between the continuous assessment favoured by some universities and the emphasis placed on final exams by others."
  courses: any;
  pageOfItems: Array<any>;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe((response) => {
      this.courses = response.courses
    });
  }
  onChangePage(pageOfItems: Array<any>) {
 
    this.pageOfItems = pageOfItems;
    }

}
