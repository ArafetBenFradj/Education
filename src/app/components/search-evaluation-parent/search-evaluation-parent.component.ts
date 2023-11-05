import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-search-evaluation-parent',
  templateUrl: './search-evaluation-parent.component.html',
  styleUrls: ['./search-evaluation-parent.component.css']
})
export class SearchEvaluationParentComponent implements OnInit {
  title: string = "Search Reviwes And Notes";
  text: string = "Reviews And Notes For Your Child";
  searchForm: FormGroup;
  user: any;
  idParent: any;
  showInput: boolean = false;
  evaluations: any;
  notes: any;
  globalEvaluations: any;
  errorMessage : string ;
  
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      PhoneChild: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
    });
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.user = this.decodeToken(sessionToken);
      console.log("here information user", this.user);
      this.idParent = this.user.id;
    }
  }
  searchEvaluations() {

    this.showInput = false;

    this.userService.searchEvaluationsAndNotesByTel(this.searchForm.value, this.idParent).subscribe((response) => {
if (response.msg) {
  this.showInput = true;
  this.evaluations = response.evaluationsByTel;
  this.notes = response.notesByTel;
  this.globalEvaluations = response.globalEvaluationsByTel;
} else {
  this.errorMessage = 'Invalid Phone Number ';
  this.showInput = false;
  setTimeout(() => {
    this.errorMessage = null;
   
  }, 2000);
}
     
    });
  }
  onValidateClick() {
    this.showInput = true;
  }
  onValidateClose() {
    this.showInput = false ;
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
}
