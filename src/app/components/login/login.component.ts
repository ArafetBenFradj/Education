import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  title: string = "Login";
  text: string = "Welcome back to our school management website! Logging in is the key to accessing a wide range of features and information."
  userLogin: any = {};
  errMsg: string;
  user : any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    console.log("Here User Login", this.userLogin);
    this.userService.login(this.userLogin).subscribe((response) => {
      console.log("here response from BE",response.msg);
      
      if (response.msg == "3") {
        this.errMsg = "Your Account is not Available";
      }
      else if (response.msg == "0" ) {
        this.errMsg = "Please check Your Phone Number/PWD";
      } 
      else if (response.msg == "1" ) {
        this.errMsg = "Please check Your Phone Number/PWD";
      } else {
        sessionStorage.setItem("token", response.token);
        let sessionToken = sessionStorage.getItem("token");
        if (sessionToken) {
          this.user = this.decodeToken(sessionToken);
        }
        if (this.user.role=="student") {
          this.router.navigate([""]);
        } else if(this.user.role=="parent") {
          this.router.navigate([""]);
        } else if(this.user.role=="teacher"){
          this.router.navigate(["coursesTeacher"]);
        } else {
          this.router.navigate(["admin"]);
        }
        
      }

    })
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
}
