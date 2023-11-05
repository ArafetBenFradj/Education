import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddCoursesComponent } from './components/add-courses/add-courses.component';
import { CoursesStudentComponent } from './components/courses-student/courses-student.component';
import { TeachersStudentComponent } from './components/teachers-student/teachers-student.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { InfoCourseComponent } from './components/info-course/info-course.component';
import { TeachersTableAdminComponent } from './components/teachers-table-admin/teachers-table-admin.component';
import { StudentsTableAdminComponent } from './components/students-table-admin/students-table-admin.component';
import { CoursesTeacherComponent } from './components/courses-teacher/courses-teacher.component';
import { StudentsTeacherComponent } from './components/students-teacher/students-teacher.component';
import { StudentsCourseTeacherComponent } from './components/students-course-teacher/students-course-teacher.component';
import { EvaluationTeacherComponent } from './components/evaluation-teacher/evaluation-teacher.component';
import { InfoTeacherComponent } from './components/info-teacher/info-teacher.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { AllTeachersComponent } from './components/all-teachers/all-teachers.component';
import { SearchEvaluationParentComponent } from './components/search-evaluation-parent/search-evaluation-parent.component';
import { AddNewsComponent } from './components/add-news/add-news.component';



const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"signupTeacher",component:SignupComponent},
  {path:"signupStudent",component:SignupComponent},
  {path:"signupParent",component:SignupComponent},
  {path:"signupAdmin",component:SignupComponent},
  {path:"addCourse",component:AddCoursesComponent},
  {path:"CoursesStudent",component:CoursesStudentComponent},
  {path:"teachersStudent",component:TeachersStudentComponent},
  {path:"admin",component:AdminComponent},
  {path:"infoCourse/:id",component:InfoCourseComponent},
  {path:"editCourse/:id",component:AddCoursesComponent},
  {path:"teachersInfoAdmin",component:TeachersTableAdminComponent},
  {path:"studentsInfoAdmin",component:StudentsTableAdminComponent},
  {path:"coursesTeacher",component:CoursesTeacherComponent},
  {path:"studentsTeacher",component:StudentsTeacherComponent},
  {path:"studentsFromCourse/:id",component:StudentsCourseTeacherComponent},
  {path:"evaluationsTeacher",component:EvaluationTeacherComponent},
  {path:"infoTeacher/:id",component:InfoTeacherComponent},
  {path:"allCourses",component:AllCoursesComponent},
  {path:"allTeachers",component:AllTeachersComponent},
  {path:"searchEvaluation",component:SearchEvaluationParentComponent},
  {path:"addNews",component:AddNewsComponent},
  {path:"editNews/:id",component:AddNewsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
