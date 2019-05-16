import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
ConnectedToken;
message: any;
  constructor(private http: HttpClient) {
    this.ConnectedToken = this.ConnectedUser();
    if (this.ConnectedToken !== null) {
    this.ConnectedToken['ownProducts'] = 0;
    this.ConnectedToken['price'] = 0;
    this.ConnectedToken.data = [];
    this.ConnectedToken['message'] = [];
    }
  }

  register(User){
    return this.http.post('http://localhost:3000/auth/signup', User);
  }
  logIn(User){
    return this.http.post('http://localhost:3000/auth/login', User);
  }
  setToken(token){
    localStorage.setItem('token',token)

  }
  ConnectedUser(){
    if(localStorage.getItem('token')){
    return jwt_decode(localStorage.getItem('token')).id;
    } else {
      return null;
    }
  }
}
