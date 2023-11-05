import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css']
})
export class AllTeachersComponent implements OnInit {
  title: string = "Our Teachers";
  text: string = "Teachers are educators who guide and inspire students to learn and grow academically and personally. They impart knowledge and skills through lessons, fostering intellectual development."
  teachers: any;
  searchTeacherForm: FormGroup;
  showSearchTeachers: boolean = false;
  showTeachers: boolean = true;
  teachersBySpeciality : any ;
  errorMessage: string | null = null;
  newSpeciality : any;
  constructor(private userService: UserService , private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchTeacherForm = this.formBuilder.group({
 
      speciality: ['', [Validators.required, Validators.minLength(3), ]],
    
  });
    this.userService.getAllTeachers().subscribe((response) => {
      this.teachers = response.teachers;
    });
  }
  searchTeacherBySpeciality() {
  this.newSpeciality=this.searchTeacherForm.value.speciality;
  this.searchTeacherForm.value.speciality=this.newSpeciality; 
console.log("form value :",this.searchTeacherForm.value);
this.userService.getTeachersBySpeciality(this.searchTeacherForm.value).subscribe((response)=>{
 if (response.message) {
  this.teachersBySpeciality=response.teachersBySpeciality;
  this.showSearchTeachers=true ;
  this.showTeachers=false ;
 } else {
  this.showSearchTeachers = false;
  this.showSearchTeachers = true;
  this.errorMessage = 'Check Speciality';
  setTimeout(() => {
    this.errorMessage = null; 
  }, 2000);
 }
  

});

  }
 
}
