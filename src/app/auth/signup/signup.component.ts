import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
export interface Role {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
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
  UserForm: FormGroup;
  constructor( private AuthService : AuthService) {
    this.UserForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      user_role: new FormControl('', [Validators.required]),
      user_image: new FormControl(''),
    })
  }

  ngOnInit() {
  }
  selectedFile(event) {
    console.log(event.target.files[0])
    this.selectedImage = event.target.files[0]
  }
  AddUser(){
    if (this.UserForm.valid){
      const formData = new FormData();
      formData.append('first_name',this.UserForm.value.first_name);
      formData.append('last_name',this.UserForm.value.last_name);
      formData.append('birthday',this.UserForm.value.birthday);
      formData.append('email',this.UserForm.value.email);
      formData.append('password',this.UserForm.value.password);
      formData.append('adresse',this.UserForm.value.adresse);
      formData.append('user_role',this.UserForm.value.user_role);
      formData.append('user_image',this.selectedImage.name);
      formData.append('image',this.selectedImage);
      this.AuthService.register(formData).subscribe((data :any)=>{
        console.log(data)
      })
    } else {
      alert('hahahaha')
    }
  }
}
