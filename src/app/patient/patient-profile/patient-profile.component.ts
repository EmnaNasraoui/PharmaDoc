import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/patient.service';


@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  resD: any;
  constructor(private PService: PatientService) { }

  ngOnInit() {
    this.PService.getAllDoctors().subscribe(async data1 => {
      this.resD = data1 ;
      console.log(this.resD) ;
    });
  }

}
