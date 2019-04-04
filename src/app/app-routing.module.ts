import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TestComponent } from './test/test.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PharmacyProfileComponent } from './pharmacy/pharmacy-profile/pharmacy-profile.component';
import { AllPharmacyComponent } from './pharmacy/all-pharmacy/all-pharmacy.component';

const routes: Routes = [
  {
    path: 'auth', component: AuthComponent , children :[
      {path :'login' , component: LoginComponent},
      {path :'signup', component : SignupComponent},
      {path :'**', redirectTo:'login' }
    ]
  },
  {path:'pharmacy', component : PharmacyComponent, children:[
    {path :'pharmacyProfile', component : PharmacyProfileComponent},
    {path : 'allPharmacy', component : AllPharmacyComponent}
  ]},
  { path:'test',component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
