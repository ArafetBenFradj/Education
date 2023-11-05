import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  user: any;
  constructor() { }

  ngOnInit() {
  }
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
}
