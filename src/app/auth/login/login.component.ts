import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UserForm: FormGroup
  token: any;
  constructor(private authService: AuthService, private CookieService:CookieService) {
    this.UserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
  }
  login(){
    this.authService.logIn(this.UserForm.value).subscribe((data:any)=>{
      console.log(data)
      alert(data.lvl)
      this.token = data.token
      this.CookieService.set('token',this.token);
      console.log(this.token)

    })
  }
}
