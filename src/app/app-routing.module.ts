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
import { TimetableComponent } from './doctor/timetable/timetable.component';
import { DoctorprofileComponent } from './doctor/doctorprofile/doctorprofile.component';
import { ViewProfileComponent } from './pharmacy/view-profile/view-profile.component';
import { ProductsComponent } from './products/products.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { ProductComponent } from './products/product/product.component';
import { CartComponent } from './products/cart/cart.component';
import { PatientComponent } from './patient/patient.component';
import { PatientProfileComponent } from './patient/patient-profile/patient-profile.component';
import { AllPatientComponent } from './patient/all-patient/all-patient.component';
import { ChatComponent } from './chat/chat.component';
import { DashboardDoctorComponent } from './doctor/dashboard-doctor/dashboard-doctor.component';


const routes: Routes = [
  { path: '',pathMatch:'full', redirectTo: 'auth' },
  { path: 'home', component: HomeComponent },
  {
    path: 'auth', component: AuthComponent , children : [
      {path : 'login' , component: LoginComponent},
      {path : 'signup', component : SignupComponent},
      {path : '**', redirectTo: 'login' }
    ]
  },
  {
    path: 'doctor', component: DoctorComponent , children :[
      {path :'alldoctors', component: AlldoctorsComponent},
      {path :'singledoctor/:id', component :SingledoctorComponent},
      {path :'dhasboard/:id', component :DashboardDoctorComponent},
      {path :'doctorprofile', component :DoctorprofileComponent},
      {path :'**', redirectTo:'alldoctors' },
      {path : 'alldoctors' , component: AlldoctorsComponent},
      {path : 'singledoctor/:id', component : SingledoctorComponent},
      {path : '**', redirectTo: 'alldoctors' }
    ]
  },
  {path : 'pharmacy', component : PharmacyComponent, children:[
    {path : 'pharmacyProfile', component : PharmacyProfileComponent},
    {path : 'allPharmacies', component : AllPharmacyComponent},
    {path : 'viewProfile/:id', component : ViewProfileComponent}
  ]},
  { path : 'test', component: TestComponent},
  { path : 'products', component : ProductsComponent, children:[
    {path : 'allProducts', component : AllProductsComponent},
    {path : 'product/:id', component : ProductComponent},
    { path : 'cart', component : CartComponent}
  ]},
  {path: 'patient', component: PatientComponent, children: [
    {path: 'patientProfile', component: PatientProfileComponent},
    {path: 'allPatient', component: AllPatientComponent},
    {path: '**', redirectTo: 'allPatient'}
  ]},
  { path: 'test', component: TestComponent},
  { path: 'chat', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
