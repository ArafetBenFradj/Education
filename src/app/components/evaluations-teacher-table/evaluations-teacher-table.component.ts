import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-evaluations-teacher-table',
  templateUrl: './evaluations-teacher-table.component.html',
  styleUrls: ['./evaluations-teacher-table.component.css']
})
export class EvaluationsTeacherTableComponent implements OnInit {
user : any;
idTeacher : any;
evaluationsTab : any ;
idEvaluation : any ;
formEvaluation: FormGroup;
evaluationForm: any = {};
showEvaluationInput: boolean = false;
successMessage: string | null = null;
  constructor(private  userService : UserService) { }

  ngOnInit() {
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.user = this.decodeToken(sessionToken);
      this.idTeacher=this.user.id;
    }
    this.userService.getAllEvaluationsByTeacher(this.idTeacher).subscribe((response)=>{
    this.evaluationsTab=response.evaluationsByTeacher;
    });

  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  getEvaluationById(id : any){
    this.idEvaluation=id; 
   }
   editEvaluation(){
    console.log("this id evaluation",this.idEvaluation);
    console.log("this form value",this.evaluationForm);
    
    
    this.userService.editEvaluation(this.evaluationForm,this.idEvaluation,this.idTeacher).subscribe((response)=>{
      console.log("here response from BE",response.message);
      
      if (response.message=="1") {
        this.successMessage = 'Review edit successfully.';
        setTimeout(() => {
          this.successMessage = null;
          this.showEvaluationInput = false;
         
        }, 2000);
        this.userService.getAllEvaluationsByTeacher(this.idTeacher).subscribe((responseGetAllEvaluations)=>{
          this.evaluationsTab=responseGetAllEvaluations.evaluationsByTeacher;
        });
      }
    
    
    });
    
      }
   onValidateClickGlobalEvaluation() {
    this.showEvaluationInput = true;
  }
}
