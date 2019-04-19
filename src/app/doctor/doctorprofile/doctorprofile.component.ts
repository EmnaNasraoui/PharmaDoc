import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DoctorService } from 'src/app/doctor.service';
export interface Roles {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {
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
  ID: any;
  results;
  DoctorForm: FormGroup;
  id_Doctor;
  constructor(private apiService: DoctorService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.DoctorForm = new FormGroup({
      day: new FormControl(''),
      Time_Of_Opening: new FormControl(''),
      Time_Of_Closing: new FormControl(''),
    });
  }

  ngOnInit() {
    this.id_Doctor = this.authService.ConnectedToken.id_doctor;
    this.apiService.getDoctorById(this.id_Doctor).subscribe((data: any) => {
      console.log(data);
      console.log(this.id_Doctor);
      this.results = [data];
    });
  }

  EditDocrtorProfile() {
    this.id_Doctor = this.authService.ConnectedToken.id_doctor;
    this.apiService.AddDoctorSchedule(this.id_Doctor, this.DoctorForm.value).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  goToTimeTable() {
    this.router.navigate(['/doctor/timetable']);
  }
}
