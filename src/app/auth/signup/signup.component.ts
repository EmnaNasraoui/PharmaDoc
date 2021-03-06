import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
export interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', 'fix.scss']
})
export class SignupComponent implements OnInit {
  Roles: Role[] = [
    { value: 'doctor', viewValue: 'Doctor' },
    { value: 'pharmacy', viewValue: 'Pharmacy' },
    { value: 'patient', viewValue: 'Patient' }
  ];

  public imagePath;
  imgURL: any;
  public message: string;
  selectedImage: File;
  show: boolean = true;
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  Schedule: FormArray;
  UserForm: FormGroup;
  ScheduleForm: FormGroup
  constructor(private AuthService: AuthService, private router: Router) {
    this.UserForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      user_role: new FormControl(''),
      specialty: new FormControl(''),
      Pharmacy_name: new FormControl(''),
      user_image: new FormControl(''),
      /*  Schedule : new FormArray([this.createSchedule()]) */

    })
  }
  ngOnInit() { }
  selectedFile(event) {
    console.log(event.target.files[0])
    this.selectedImage = event.target.files[0]
  }
  /*  createSchedule() : FormGroup {
     return new FormGroup({
      
     })
     } */
  AddUser() {
    if (this.UserForm.valid) {
      if (this.UserForm.value.user_role == 'doctor') {

        const formData = new FormData();
        formData.append('first_name', this.UserForm.value.first_name);
        formData.append('last_name', this.UserForm.value.last_name);
        formData.append('birthday', this.UserForm.value.birthday);
        formData.append('email', this.UserForm.value.email);
        formData.append('password', this.UserForm.value.password);
        formData.append('adresse', this.UserForm.value.adresse);
        formData.append('user_role', this.UserForm.value.user_role);
        formData.append('specialty', this.UserForm.value.specialty);
        formData.append('user_image', this.selectedImage.name);
        formData.append('image', this.selectedImage);
        this.AuthService.register(formData).subscribe((data: any) => {
          console.log(data)
        })
        alert('you are added with success')
        this.router.navigate(['/auth/login'])

      }
      else {
        if (this.UserForm.value.user_role == 'pharmacy') {
          const formData = new FormData();
          formData.append('first_name', this.UserForm.value.first_name);
          formData.append('last_name', this.UserForm.value.last_name);
          formData.append('birthday', this.UserForm.value.birthday);
          formData.append('email', this.UserForm.value.email);
          formData.append('password', this.UserForm.value.password);
          formData.append('adresse', this.UserForm.value.adresse);
          formData.append('user_role', this.UserForm.value.user_role);
          formData.append('Pharmacy_name', this.UserForm.value.Pharmacy_name); 
          formData.append('user_image', this.selectedImage.name);
          formData.append('image', this.selectedImage);
          this.AuthService.register(formData).subscribe((data: any) => {
            console.log(data)
          })
          alert('you are added with success')
          this.router.navigate(['/auth/login'])
        }
        else {
          if (this.UserForm.value.user_role == 'patient') {
            const formData = new FormData();
            formData.append('first_name', this.UserForm.value.first_name);
            formData.append('last_name', this.UserForm.value.last_name);
            formData.append('birthday', this.UserForm.value.birthday);
            formData.append('email', this.UserForm.value.email);
            formData.append('password', this.UserForm.value.password);
            formData.append('adresse', this.UserForm.value.adresse);
            formData.append('user_role', this.UserForm.value.user_role);
            formData.append('user_image', this.selectedImage.name);
            formData.append('image', this.selectedImage);
            this.AuthService.register(formData).subscribe((data: any) => {
              console.log(data)
            })
            alert('you are added with success')
            this.router.navigate(['/auth/login'])

          }
          else {
            alert('error')
          }
        }
      }
    }
  }
}
