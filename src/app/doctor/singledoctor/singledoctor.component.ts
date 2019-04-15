import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import * as jwt_decode from 'jwt-decode'
import { CookieService } from 'ngx-cookie-service';


export interface Roles {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-singledoctor',
  templateUrl: './singledoctor.component.html',
  styleUrls: ['./singledoctor.component.css']
})
export class SingledoctorComponent implements OnInit {
  ID: any;
  results;
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

  DoctorForm: FormGroup;
  id_Doctor: any;

  constructor(private apiService: DoctorService, private route: ActivatedRoute , private router: Router,  private cookieService: CookieService ) {
    this.DoctorForm = new FormGroup({ 
      day: new FormControl(''),
      Time_Of_Opening: new FormControl(''),
      Time_Of_Closing: new FormControl(''),
    })
  }

  ngOnInit() {
    this.ID = this.route.snapshot.paramMap.get('id')
    this.apiService.getDoctorById(this.ID).subscribe((data: any) => {
      console.log(data);
      this.results = [data];
    });

  }

  goToTimeTable()
  {
    this.router.navigate(['/doctor/timetable']);
  }

  EditDocrtorProfile()
  {
    this.id_Doctor = jwt_decode(this.cookieService.get('token')).id.id_doctor
    this.apiService.AddDoctorSchedule(this.id_Doctor,this.DoctorForm.value).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit()
    })
  }

}