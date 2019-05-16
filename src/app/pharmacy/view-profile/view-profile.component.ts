import { Component, OnInit } from '@angular/core';
import { PharmacyService } from 'src/app/pharmacy.service';
import {  ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DoctorService } from 'src/app/doctor.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  id_pharmacy: any;
  results: any;
  products: any;
  id_doctor: any;
  statue: any;

  constructor(private pharmacyService: PharmacyService, private router: ActivatedRoute, private authService: AuthService,
    private doctorService : DoctorService) { }

  ngOnInit() {
    this.id_pharmacy = this.router.snapshot.paramMap.get('id')
    this.pharmacyService.GetPharmacyById(this.id_pharmacy).subscribe((data: any) => {
      this.results = [data];
    })
    this.pharmacyService.GetProductById(this.id_pharmacy).subscribe((data: any) => {
      this.products = data;
      console.log(data);
    });
  }
AddPrantership(){
  this.id_pharmacy = this.router.snapshot.paramMap.get('id');
  this.id_doctor = this.authService.ConnectedToken.id_doctor;
  const Obj = {
    Pharmacy: this.id_pharmacy,
    Doctor: this.id_doctor
};
  this.doctorService.AddPratnership(this.id_doctor, this.id_pharmacy, Obj).subscribe((data: any) => {

    data.forEach(element => {
      if(element.MSG){
        alert(element.MSG);
        this.authService.ConnectedToken['message'].push(element.MSG)
      }
    });
  });
}
}
