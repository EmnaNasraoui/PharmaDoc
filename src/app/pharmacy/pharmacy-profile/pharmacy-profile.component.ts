import { Component, OnInit } from '@angular/core';
import { PharmacyService } from 'src/app/pharmacy.service';
import * as jwt_decode from 'jwt-decode'
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl } from '@angular/forms';
export interface Roles {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-pharmacy-profile',
  templateUrl: './pharmacy-profile.component.html',
  styleUrls: ['./pharmacy-profile.component.css']
})
export class PharmacyProfileComponent implements OnInit {
  Days: Roles[] = [
    { value: 'monday', viewValue: 'Monday' },
    { value: 'tuesday', viewValue: ' Tuesday' },
    { value: 'thursday', viewValue: 'Thursday' },
    { value: 'friday', viewValue: 'Friday' },
    { value: 'saturday', viewValue: ' Saturday' },
    { value: 'sunday', viewValue: ' Sunday' }
  ];
  TimeOfOpenings: Roles[] = [
    { value: '00', viewValue: ' 00' },
    { value: '01', viewValue: ' 01' },
    { value: '02', viewValue: ' 02' },
    { value: '03', viewValue: ' 03' },
    { value: '04', viewValue: ' 04' },
    { value: '05', viewValue: ' 05' },
    { value: '06', viewValue: ' 06' },
    { value: '07', viewValue: ' 07' },
    { value: '08', viewValue: ' 08' },
    { value: '09', viewValue: ' 09' },
    { value: '10', viewValue: ' 10' },
    { value: '11', viewValue: ' 11' },
    { value: '12', viewValue: ' 12' },
    { value: '13', viewValue: ' 13' },
    { value: '14', viewValue: ' 14' },
    { value: '15', viewValue: ' 15' },
    { value: '16', viewValue: ' 16' },
    { value: '17', viewValue: ' 18' },
    { value: '19', viewValue: ' 19' },
    { value: '20', viewValue: ' 20' },
    { value: '21', viewValue: ' 21' },
    { value: '22', viewValue: ' 22' },
    { value: '23', viewValue: ' 23' },
    { value: '24', viewValue: ' 24' },
  ];
  TimeOfClosings: Roles[] = [
    { value: '00', viewValue: ' 00' },
    { value: '01', viewValue: ' 01' },
    { value: '02', viewValue: ' 02' },
    { value: '03', viewValue: ' 03' },
    { value: '04', viewValue: ' 04' },
    { value: '05', viewValue: ' 05' },
    { value: '06', viewValue: ' 06' },
    { value: '07', viewValue: ' 07' },
    { value: '08', viewValue: ' 08' },
    { value: '09', viewValue: ' 09' },
    { value: '10', viewValue: ' 10' },
    { value: '11', viewValue: ' 11' },
    { value: '12', viewValue: ' 12' },
    { value: '13', viewValue: ' 13' },
    { value: '14', viewValue: ' 14' },
    { value: '15', viewValue: ' 15' },
    { value: '16', viewValue: ' 16' },
    { value: '17', viewValue: ' 18' },
    { value: '19', viewValue: ' 19' },
    { value: '20', viewValue: ' 20' },
    { value: '21', viewValue: ' 21' },
    { value: '22', viewValue: ' 22' },
    { value: '23', viewValue: ' 23' },
    { value: '24', viewValue: ' 24' },

  ];
  id_pharmacy: any;
  results: any;
  PharmacyForm: FormGroup;

  constructor(private pharmacyService: PharmacyService, private cookieService: CookieService) {
    this.PharmacyForm = new FormGroup({
      day: new FormControl(''),
      Time_Of_Opening: new FormControl(''),
      Time_Of_Closing: new FormControl(''),
    })
  }

  ngOnInit() {
    this.id_pharmacy = jwt_decode(this.cookieService.get('token')).id.id_pharmacy
    this.pharmacyService.GetPharmacyById(this.id_pharmacy).subscribe((data: any) => {
      this.results = [data];
    })
  }
  EditPharmacyProfile() {
    this.id_pharmacy = jwt_decode(this.cookieService.get('token')).id.id_pharmacy
    this.pharmacyService.EditPharmacyById(this.id_pharmacy, this.PharmacyForm.value).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit()
    })
  }
}
