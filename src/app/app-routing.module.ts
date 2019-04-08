import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AlldoctorsComponent } from './doctor/alldoctors/alldoctors.component';
import { SingledoctorComponent } from './doctor/singledoctor/singledoctor.component';
import { DoctorComponent } from './doctor/doctor.component';
import { TestComponent } from './test/test.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PharmacyProfileComponent } from './pharmacy/pharmacy-profile/pharmacy-profile.component';
import { AllPharmacyComponent } from './pharmacy/all-pharmacy/all-pharmacy.component';
import { PatientComponent } from './patient/patient.component';
import { PatientProfileComponent } from './patient/patient-profile/patient-profile.component';
import { AllPatientComponent } from './patient/all-patient/all-patient.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'auth', component: AuthComponent , children :[
      {path :'login' , component: LoginComponent},
      {path :'signup', component : SignupComponent},
      {path :'**', redirectTo:'login' }
    ]
  },
  {
    path: 'doctor', component: DoctorComponent , children :[
      {path :'alldoctors' , component: AlldoctorsComponent},
      {path :'singledoctor/:id', component :SingledoctorComponent},
      {path :'**', redirectTo:'alldoctors' }
    ]
  },
  {path:'pharmacy', component : PharmacyComponent, children:[
    {path :'pharmacyProfile', component : PharmacyProfileComponent},
    {path : 'allPharmacy', component : AllPharmacyComponent}
  ]},
  {path:'patient',component:PatientComponent,children:[
    {path:'patientProfile',component:PatientProfileComponent},
    {path:'allPatient',component:AllPatientComponent},
    {path:'**',component:AllPatientComponent}
  ]},
  { path:'test',component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
