import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseURl: string = "http://localhost:3000/courses";
  constructor(private http: HttpClient) { }
  addCourse(course : any , file :File){
    let formData = new FormData();
    formData.append("name",course.name);
    formData.append("monthDuree",course.monthDuree);
    formData.append("HourDuree",course.HourDuree);
    formData.append("description",course.description);
    formData.append("price",course.price);
    formData.append("img",file);
    formData.append("idTeacher",course.idTeacher);
    return this.http.post<{ message: string }>(this.courseURl +"/addCourse" , formData);
  }
  editCourse(id :any , course : any ,file : File) {
    const formData = new FormData();
    formData.append('_id', course.id);
    formData.append('name', course.name);
    formData.append('monthDuree', course.monthDuree);
    formData.append('HourDuree', course.HourDuree);
    formData.append('description', course.description);
    formData.append('price', course.price);
    formData.append('img', file);
    return this.http.put<{ courseIsUpdated: boolean }>(`${this.courseURl }/editCourse/${id}`, formData);
   }
    // Request : Boolean
  deleteCourse(id : any) { 
    return this.http.delete<{ message: string }>(`${this.courseURl}/deleteCourse/${id}`)
  }
  getAllCourses(){
    return this.http.get<{courses : any}>(this.courseURl );
  }
  getCourseById(id :any){
    return this.http.get<{course : any}>(`${this.courseURl}/getCourseById/${id}`);
  }
  getAllCoursesByTeacher(id : any){
    return this.http.get<{coursesByTeacher : any}>(`${this.courseURl}/getAllCoursesByTeacher/${id}` );
  }
  getAllCoursesFromStudent(id : any){
    return this.http.get<{coursesByStudent : any}>(`${this.courseURl}/getAllCoursesFromStudent/${id}` );
  }
  getAllStudentsFromCourse(id :any){
    return this.http.get<{studentsByCourse : any}>(`${this.courseURl}/getAllStudentsFromCourse/${id}` );
  }
  getEvaluationFromCourseByIdStudent(idCourse :any , idStudent : any){
    return this.http.get<{EvaluationFromCourseByIdStudent : any , message : boolean}>(`${this.courseURl}/getEvaluationfromCourseByIdStudent/${idCourse}/${idStudent}` );
  }
  getTeacherInfoFromCourse(idCourse :any ){
    return this.http.get<{teacherInfo : any }>(`${this.courseURl}/getTeacherInfoFromCourse/${idCourse}` );
  }
  getRelatedCoursBySpeciality(speciality :any ,idCourse : any ){
    return this.http.get<{relatedCourses : any }>(`${this.courseURl}/getRelatedCoursBySpeciality/${speciality}/${idCourse}` );
  }
    getNoteFromCourseByIdStudent(idCourse :any , idStudent : any){
    return this.http.get<{noteFromCourseByIdStudent : any , message : boolean}>(`${this.courseURl}/getNoteFromCourseByIdStudent/${idCourse}/${idStudent}` );
  }
  affectStudentInCourseByAdmin(course :any , idStudent : any , idCourse : any){
    return this.http.post<{ message : string }>(`${this.courseURl}/affectStudentInCourseByAdmin/${idStudent}/${idCourse}`,course);
  }
  affectCourseInStudentByAdmin(student :any , idCourse : any ,idStudent : any){
    return this.http.post<{ message : string }>(`${this.courseURl}/affectCourseInStudentByAdmin/${idCourse}/${idStudent}`,student);
  }
  addEvaluationToCourse(evaluation :any , idCourse : any ,idStudent : any , idTeacher : any){
    return this.http.post<{ message : string }>(`${this.courseURl}/addEvaluationToCourse/${idCourse}/${idStudent}/${idTeacher}`,evaluation);
  }
  addNoteToCourse(note :any , idCourse : any ,idStudent : any , idTeacher : any){
    return this.http.post<{ message : string }>(`${this.courseURl}/addNoteToCourse/${idCourse}/${idStudent}/${idTeacher}`,note);
  }
}
