import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeachersHomeComponent } from './components/teachers-home/teachers-home.component';
import { EventsComponent } from './components/events/events.component';
import { BannerFeatureComponent } from './components/banner-feature/banner-feature.component';
import { SliderComponent } from './components/slider/slider.component';
import { NewsComponent } from './components/news/news.component';

import { LoginComponent } from './components/login/login.component';

import { AddCoursesComponent } from './components/add-courses/add-courses.component';
import { BannerComponent } from './components/banner/banner.component';
import { SingleCourseComponent } from './components/single-course/single-course.component';
import { CoursesStudentComponent } from './components/courses-student/courses-student.component';
import { SingleTeacherComponent } from './components/single-teacher/single-teacher.component';
import { TeachersStudentComponent } from './components/teachers-student/teachers-student.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { AdminComponent } from './components/admin/admin.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { ParentsTableComponent } from './components/parents-table/parents-table.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { InfoCourseComponent } from './components/info-course/info-course.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { TeachersTableAdminComponent } from './components/teachers-table-admin/teachers-table-admin.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentsTableAdminComponent } from './components/students-table-admin/students-table-admin.component';
import { DisplayTeacherAdminComponent } from './components/display-teacher-admin/display-teacher-admin.component';
import { DisplayStudentAdminComponent } from './components/display-student-admin/display-student-admin.component';
import { AffectStudentComponent } from './components/affect-student/affect-student.component';
import { CoursesTeacherComponent } from './components/courses-teacher/courses-teacher.component';
import { ListStudentsTeacherComponent } from './components/list-students-teacher/list-students-teacher.component';
import { StudentsTeacherComponent } from './components/students-teacher/students-teacher.component';
import { SingleStudentComponent } from './components/single-student/single-student.component';
import { StudentsCourseTeacherComponent } from './components/students-course-teacher/students-course-teacher.component';
import { EvaluationTeacherComponent } from './components/evaluation-teacher/evaluation-teacher.component';
import { EvaluationsTeacherTableComponent } from './components/evaluations-teacher-table/evaluations-teacher-table.component';
import { NotesTeacherTableComponent } from './components/notes-teacher-table/notes-teacher-table.component';
import { GlobalEvaluationsTeacherTableComponent } from './components/global-evaluations-teacher-table/global-evaluations-teacher-table.component';
import { InfoTeacherComponent } from './components/info-teacher/info-teacher.component';
import { CoursesHomeComponent } from './components/courses-home/courses-home.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { AllTeachersComponent } from './components/all-teachers/all-teachers.component';
import { SearchEvaluationParentComponent } from './components/search-evaluation-parent/search-evaluation-parent.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { SingleNewsComponent } from './components/single-news/single-news.component';
import { NewsTableComponent } from './components/news-table/news-table.component';
import { InfoNewsComponent } from './components/info-news/info-news.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CoursesComponent,
    TeachersHomeComponent,
    EventsComponent,
    BannerFeatureComponent,
    SliderComponent,
    NewsComponent,
    LoginComponent,
    AddCoursesComponent,
    BannerComponent,
    SingleCourseComponent,
    CoursesStudentComponent,
    SingleTeacherComponent,
    TeachersStudentComponent,
    SignupComponent,
    UsersTableComponent,
    AdminComponent,
    TeachersTableComponent,
    StudentsTableComponent,
    ParentsTableComponent,
    CoursesTableComponent,
    InfoCourseComponent,
    EditTeacherComponent,
    TeachersTableAdminComponent,
    EditStudentComponent,
    StudentsTableAdminComponent,
    DisplayTeacherAdminComponent,
    DisplayStudentAdminComponent,
    AffectStudentComponent,
    CoursesTeacherComponent,
    ListStudentsTeacherComponent,
    StudentsTeacherComponent,
    SingleStudentComponent,
    StudentsCourseTeacherComponent,
    EvaluationTeacherComponent,
    EvaluationsTeacherTableComponent,
    NotesTeacherTableComponent,
    GlobalEvaluationsTeacherTableComponent,
    InfoTeacherComponent,
    CoursesHomeComponent,
    AllCoursesComponent,
    AllTeachersComponent,
    SearchEvaluationParentComponent,
    AddNewsComponent,
    SingleNewsComponent,
    NewsTableComponent,
    InfoNewsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    JwPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
