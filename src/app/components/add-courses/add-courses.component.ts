import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {
  addCourseForm: FormGroup;
  imagePreview : string ;
  courseId : any ;
  idTeacher : any;
  course : any={};
  user : any ;
  btnTitle : string = "Add Course";
  bannerTitle : string ="Add-Form"
  title: string = "Add Course";
  text: string = "Our courses offer a good compromise between the continuous assessment favoured by some universities and the emphasis placed on final exams by others."
  constructor(private formBuilder: FormBuilder , private courseService : CourseService ,private activatedRoute : ActivatedRoute , private router : Router) { }

  ngOnInit() {
    this.addCourseForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      monthDuree: ['', [Validators.required, Validators.min(2), Validators.max(6)]],
      HourDuree: ['', [Validators.required, Validators.min(2), Validators.max(4)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(20)]],
      img: [''],
    });
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.btnTitle = "Edit Course";
      this.bannerTitle="Edit-Form"
      this.courseService.getCourseById(this.courseId).subscribe((response) => {
        this.course = response.course;
        this.imagePreview = this.course.imgCourse;
      });
    }
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.user = this.decodeToken(sessionToken);
      console.log("here information user", this.user);
      this.idTeacher=this.user.id;
    }
  }
  addOrEditCourse() {
    this.addCourseForm.value.idTeacher=this.idTeacher;
    console.log("addCourseForm.value", this.addCourseForm.value);
    
if (this.courseId) {
  this.courseService.editCourse(this.courseId,this.course,this.addCourseForm.value.img).subscribe((response) => {
    console.log("here reponse Add Match from BE", response.courseIsUpdated);
    if ( response.courseIsUpdated) {
      if (this.user.role=="admin") {
        this.router.navigate(["admin"]);
      } else {
        this.router.navigate(["coursesTeacher"]);
      }
      
    }
  });
} else {
  
  this.courseService.addCourse(this.addCourseForm.value,this.addCourseForm.value.img).subscribe((response)=>{
    console.log("here response from BE",response.message);
     this.router.navigate(["coursesTeacher"]);
  });
}

  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addCourseForm.patchValue({ img: file });
    this.addCourseForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
}
