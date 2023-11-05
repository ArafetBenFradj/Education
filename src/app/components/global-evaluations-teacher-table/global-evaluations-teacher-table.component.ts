import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-global-evaluations-teacher-table',
  templateUrl: './global-evaluations-teacher-table.component.html',
  styleUrls: ['./global-evaluations-teacher-table.component.css']
})
export class GlobalEvaluationsTeacherTableComponent implements OnInit {
user : any ;
idTeacher : any ;
evaluationsTab : any ;
formGlobalEvaluation: FormGroup;
globalEvaluationForm: any = {};
showGlobalEvaluationInput: boolean = false;
idEvaluation : any ;
successMessage: string | null = null;
  constructor(private userService : UserService) { }

  ngOnInit() {
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.user = this.decodeToken(sessionToken);
      this.idTeacher = this.user.id;
    }
    this.userService.getAllGlobalEvaluationsByTeacher(this.idTeacher).subscribe((response)=>{
    this.evaluationsTab=response.globalEvaluationsByTeacher;
    });
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  getGlobalEvaluationById(id : any){
   this.idEvaluation=id; 
  }
  editGlobalEvaluation(){
this.userService.editGlobalEvaluation(this.globalEvaluationForm,this.idEvaluation,this.idTeacher).subscribe((response)=>{
  if (response.message=="1") {
    this.successMessage = 'Review edit successfully.';
    setTimeout(() => {
      this.successMessage = null;
      this.showGlobalEvaluationInput = false; 
    }, 2000);
    this.userService.getAllGlobalEvaluationsByTeacher(this.idTeacher).subscribe((responseGetAllEvaluations)=>{
      this.evaluationsTab=responseGetAllEvaluations.globalEvaluationsByTeacher;
    });
  }


});

  }
  onValidateClickGlobalEvaluation() {
    this.showGlobalEvaluationInput = true;
  }
}
