import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './home/home.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AlldoctorsComponent } from './doctor/alldoctors/alldoctors.component';
import { SingledoctorComponent } from './doctor/singledoctor/singledoctor.component';
import { TestComponent } from './test/test.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PharmacyProfileComponent } from './pharmacy/pharmacy-profile/pharmacy-profile.component';
import { AllPharmacyComponent } from './pharmacy/all-pharmacy/all-pharmacy.component';
import { ViewProfileComponent } from './pharmacy/view-profile/view-profile.component';
import { ProductsComponent } from './products/products.component';
import {orderByPrice} from './products/product/orderByPrice.pipe'
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { ProductComponent } from './products/product/product.component';
import { CartComponent } from './products/cart/cart.component';
import { FilterForProductsPipe } from './filter-for-products.pipe';
import { PatientComponent } from './patient/patient.component';
import { PatientProfileComponent } from './patient/patient-profile/patient-profile.component';
import { AllPatientComponent } from './patient/all-patient/all-patient.component';
import { CheckBoxFiltrePipe } from './check-box-filtre.pipe';
import { Ng5SliderModule } from 'ng5-slider';
import { FiltrePricePipe } from './filtre-price.pipe';
import { ChatComponent } from './chat/chat.component';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DoctorComponent,
    AlldoctorsComponent,
    SingledoctorComponent,
    TestComponent,
    PharmacyComponent,
    PharmacyProfileComponent,
    AllPharmacyComponent,
    ViewProfileComponent,
    ProductsComponent,
    orderByPrice,
    AllProductsComponent,
    ProductComponent,
    CartComponent,
    FilterForProductsPipe,
    PatientComponent,
    PatientProfileComponent,
    AllPatientComponent,
    CheckBoxFiltrePipe,
    FiltrePricePipe,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
         SocketIoModule.forRoot(config),
         FilterPipeModule,
         Ng5SliderModule
    ],
  exports: [ ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
