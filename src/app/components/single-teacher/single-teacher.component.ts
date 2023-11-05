import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-teacher',
  templateUrl: './single-teacher.component.html',
  styleUrls: ['./single-teacher.component.css']
})
export class SingleTeacherComponent implements OnInit {
  @Input() teacherInfo: any;
  user: any;
  showEvaluationInput: boolean = false;
  idStudent: any;
  evaluationValue: any;
  errorMsgEvaluation: string;
  path: string;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.path = this.router.url;
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.user = this.decodeToken(sessionToken);
      console.log("user Information", this.user);
      this.idStudent = this.user.id;

    }
  }
  goToDisplayInfo(id: any) {
    this.router.navigate([`infoTeacher/${id}`]);

  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  showEvaluationStudentFromTeacher(idTeacher: any) {
    this.userService.getEvaluationFromStudentByIdTeacher(this.idStudent, idTeacher).subscribe((response) => {
      console.log("evaluation", response.evaluationFromStudentByIdTeacher);
      console.log("message", response.message);
      if (response.message) {


        this.evaluationValue = response.evaluationFromStudentByIdTeacher.evaluation;
        setTimeout(() => {
          this.showEvaluationInput = false;
        }, 5000);
      } else {
        this.errorMsgEvaluation = "You don't Have Review at this Teacher";
        this.showEvaluationInput = false;
        setTimeout(() => {
          this.errorMsgEvaluation = null;

        }, 3000);

      }



    });
  }
  onValidateClickEvaluation() {
    this.showEvaluationInput = true;
  }
}
