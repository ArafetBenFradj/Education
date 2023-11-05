import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
  title: string = "our Courses in :"
  date: Date = new Date();
  courses : any =[];
  constructor(private courseService : CourseService , private router : Router) { }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe((response) => {
      this.courses = response.courses;
    });
  }
  goToDisplay(id: any) {
    this.router.navigate([`infoCourse/${id}`]);

  }
  goToDisplayEdit(id: any) {
    this.router.navigate([`editCourse/${id}`]);

  }
  deleteCourse(id : any){
    this.courseService.deleteCourse(id).subscribe((responseDelete) => {
      if (responseDelete.message=="1") {
        this.courseService.getAllCourses().subscribe((responseGet) => {
          this.courses= responseGet.courses;
        });
    
      }
    
    });
  }

}