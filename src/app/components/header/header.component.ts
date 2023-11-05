import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor() { }

  ngOnInit() { 
  }
  // Retrieve the JWT token from session storage
  isLoggedIn() {
    const jwt = sessionStorage.getItem("token");
    if (jwt) {
      this.user = this.decodeToken(jwt);
    }
    return !!jwt;
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }
  logOut() {
    sessionStorage.removeItem("token");
  }
}
