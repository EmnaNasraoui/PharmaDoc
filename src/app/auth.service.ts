import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
ConnectedToken;
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.ConnectedToken = this.ConnectedUser();
    if(this.ConnectedToken !== null){
    this.ConnectedToken['ownProducts'] = 0;
    }
  }

  register(User){
    return this.http.post('http://localhost:3000/auth/signup', User);
  }
  logIn(User){
    return this.http.post('http://localhost:3000/auth/login', User);
  }
  setToken(token){
    this.cookieService.set('token', token);

  }
  ConnectedUser(){
    if(this.cookieService.get('token')){
    return jwt_decode(this.cookieService.get('token')).id;
    } else {
      return null;
    }
  }
}
