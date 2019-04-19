import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/patient.service';
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode'
import { CookieService } from 'ngx-cookie-service';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  DoctorID: any;
  PatientID: any;
  result: any;
  doc: any;

  constructor(private Pservice: PatientService, private router: ActivatedRoute, private cookieService: CookieService) { }

  ngOnInit() {
    this.DoctorID = this.router.snapshot.paramMap.get('id');
    console.log(this.DoctorID);
//     this.PatientID = jwt_decode(this.cookieService.get('token')).id.PatientID ;
// console.log(this.PatientID) ;

this.Pservice.getDoctorById(this.DoctorID).subscribe( (data) => {
  console.log(data);

this.doc = data ;
console.log(this.doc) ;
});
  }
P_get_rdv() {
  this.Pservice.getRDV(this.DoctorID, this.PatientID ).subscribe(async data => {
this.result = data;
console.log(this.result) ;
  });
}
}
