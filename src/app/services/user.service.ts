import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURl: string = "http://localhost:3000/users";
  constructor(private http: HttpClient) { }
  getAllTeachers(){
    return this.http.get<{teachers : any}>(this.userURl + "/teachers");
  }
  getTeacherById(id :any){
    return this.http.get<{teacher : any}>(`${this.userURl}/teachers/getTeacherById/${id}`);
  }
  
  editStatusTeacher( teacher : any){
    return this.http.put<{teacherAfterSave : any}>(`${this.userURl}/teachers/status/`,teacher);
  }
  editTeacher(id :any , teacher : any , cvFile : File, imgFile : File) {
    let formData = new FormData();
    formData.append("firstName", teacher.firstName);
    formData.append("lastName", teacher.lastName);
    formData.append("tel", teacher.tel);
    formData.append("address", teacher.address);
    formData.append("email", teacher.email);
    formData.append("speciality", teacher.speciality);
    formData.append("cv", cvFile);
    formData.append("img", imgFile);
    return this.http.put<{ teacherIsUpdated: boolean }>(`${this.userURl}/editTeacher/${id}`, formData);
   }
   deleteTeacher(id : any) { 
    return this.http.delete<{ message : string }>(`${this.userURl}/deleteTeacher/${id}`);
  }
  getAllStudents(){
    return this.http.get<{students : any}>(this.userURl + "/students");
  }
  getStudentById(id :any){
    return this.http.get<{student : any}>(`${this.userURl}/students/getStudentById/${id}`);
  }
  getAllStudentsByTeacher(id : any){
    return this.http.get<{studentsByTeacher : any}>(`${this.userURl}/getAllStudentsByTeacher/${id}` );
  }
  editStudent(id :any , student : any , imgFile : File) {
    let formData = new FormData();
    formData.append("firstName",student.firstName);
    formData.append("lastName",student.lastName);
    formData.append("tel",student.tel);
    formData.append("address",student.address);
    formData.append("email",student.email);
    formData.append("img", imgFile);
    return this.http.put<{ studentIsUpdated: boolean }>(`${this.userURl}/editStudent/${id}`, formData);
   }
   deleteStudent(id : any) { 
    return this.http.delete<{ message : string }>(`${this.userURl}/deleteStudent/${id}`);
  }

  affectTeacherInStudentByAdmin(student :any , idTeacher : any , idStudent : any){
    return this.http.post<{ message : string }>(`${this.userURl}/affectTeacherInStudentByAdmin/${idTeacher}/${idStudent}`,student);
  }
  affectStudentInTeacherByAdmin(teacher :any , idStudent : any,idTeacher : any){
    return this.http.post<{ message : string }>(`${this.userURl}/affectStudentInTeacherByAdmin/${idStudent}/${idTeacher}`,teacher);
  }
  getAllTeachersFromStudent(idStudent : any){
    return this.http.get<{teachersByStudent : any}>(`${this.userURl}/getAllTeachersFromStudent/${idStudent}`);
  }
  getAllParents(){
    return this.http.get<{parents : any}>(this.userURl + "/parents");
  }
  addEvaluationToStudent(evaluation :any , idStudent : any ,idCourse : any , idTeacher : any){
    return this.http.post<{ message : string }>(`${this.userURl}/addEvaluationToStudent/${idStudent}/${idCourse}/${idTeacher}`,evaluation);
  }
  addEvaluationToTeacher(evaluation :any , idTeacher : any , idStudent : any ,idCourse : any ){
    return this.http.post<{ message : string }>(`${this.userURl}/addEvaluationToTeacher/${idTeacher}/${idStudent}/${idCourse}`,evaluation);
  }
    addGlobalEvaluationToStudent(evaluation :any , idStudent : any , idTeacher : any){
    return this.http.post<{ message : string }>(`${this.userURl}/addGlobalEvaluationToStudent/${idStudent}/${idTeacher}`,evaluation);
  }
  addGlobalEvaluationToTeacher(evaluation :any , idTeacher : any , idStudent : any ){
    return this.http.post<{ message : string }>(`${this.userURl}/addGlobalEvaluationToTeacher/${idTeacher}/${idStudent}`,evaluation);
  }
  addNoteToStudent(note :any , idStudent : any ,idCourse : any , idTeacher : any){
    return this.http.post<{ message : string }>(`${this.userURl}/addNoteToStudent/${idStudent}/${idCourse}/${idTeacher}`,note);
  }
  addNoteToTeacher(note :any , idTeacher : any , idStudent : any ,idCourse : any ){
    return this.http.post<{ message : string }>(`${this.userURl}/addNoteToTeacher/${idTeacher}/${idStudent}/${idCourse}`,note);
  }
  getAllEvaluationsByTeacher(id : any){
    return this.http.get<{evaluationsByTeacher : any}>(`${this.userURl}/getAllEvaluationsByTeacher/${id}`);
  }
  getAllNotesByTeacher(id : any){
    return this.http.get<{notesByTeacher : any}>(`${this.userURl}/getAllNotesByTeacher/${id}`);
  }
  getAllGlobalEvaluationsByTeacher(id : any){
    return this.http.get<{globalEvaluationsByTeacher : any}>(`${this.userURl}/getAllGlobalEvaluationsByTeacher/${id}`);
  }
  getEvaluationFromStudentByIdTeacher( idStudent : any ,idTeacher :any ){
    return this.http.get<{evaluationFromStudentByIdTeacher : any , message : boolean}>(`${this.userURl}/getEvaluationFromStudentByIdTeacher/${idStudent}/${idTeacher}` );
  }
  getTeachersBySpeciality( obj : any){
    return this.http.post<{teachersBySpeciality : any , message : boolean}>(`${this.userURl}/getTeachersBySpeciality` , obj);
  }
  searchEvaluationsAndNotesByTel(obj : any , idParent : any){
    return this.http.post<{evaluationsByTel : any , notesByTel : any , globalEvaluationsByTel : any , msg :boolean}>(`${this.userURl}/searchEvaluationsAndNotesByTel/${idParent}`,obj);
  }
  editGlobalEvaluation(evaluation : any , id : any ,idTeacher :any){
    return this.http.put<{message :string}>(`${this.userURl}/editGlobalEvaluationById/${id}/${idTeacher}`,evaluation);
  }
  editEvaluation(evaluation : any , id : any ,idTeacher :any){
    return this.http.put<{message :string}>(`${this.userURl}/editEvaluation/${id}/${idTeacher}`,evaluation);
  }
  editNote(note : any , id : any ,idTeacher :any){
    return this.http.put<{message :string}>(`${this.userURl}/editNote/${id}/${idTeacher}`,note);
  }
   // Request : Boolean
  signup(obj: any, cvFile: File, imgFile: File, role: string) {
  let formData = new FormData();
  
  formData.append("firstName", obj.firstName);
  formData.append("lastName", obj.lastName);
  formData.append("tel", obj.tel);
  formData.append("address", obj.address);
  formData.append("email", obj.email);
  formData.append("pwd", obj.pwd);
  formData.append("role", obj.role);

  if (role === "teacher") {
    formData.append("speciality", obj.speciality);
    formData.append("cv", cvFile);
    formData.append("img", imgFile);
    formData.append("status", obj.status);
  } else if (role === "student") {
    formData.append("img", imgFile);
  } else if (role === "parent") {
    formData.append("numberOfChildren", obj.numberOfChildren);
    formData.append("childrenArray", JSON.stringify(obj.childrenArray));
  }
  
  
  return this.http.post<{ message: string}>(this.userURl + "/signup", formData);
  }
  login(user : any){
  return this.http.post<{ msg: string , token : any}>(this.userURl + "/login", user);
  }
}
