import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  register(User){
    return this.http.post('http://localhost:3000/auth/signup',User)
  }
  logIn(User){
    return this.http.post('http://localhost:3000/auth/login',User)
  }
}
