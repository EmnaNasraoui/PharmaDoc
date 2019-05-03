import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UserForm: FormGroup
  token: any;
  constructor(private authService: AuthService, private router: Router) {
    this.UserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
  }
  login(){
    this.authService.logIn(this.UserForm.value).subscribe((data: any) => {

      if (data.lvl === 'Your connexion is valide') {
        this.token = data.token;
        this.authService.setToken(this.token);
        this.authService.ConnectedToken = this.authService.ConnectedUser();
        // this.authService.ConnectedToken['ownProducts'] = 0;
        this.router.navigate(['/doctor/doctorprofile']);
      }
      else{
        alert(data.lvl)
      }
    })
  }
}
