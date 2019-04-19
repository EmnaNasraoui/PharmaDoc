import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/patient.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-all-patient',
  templateUrl: './all-patient.component.html',
  styleUrls: ['./all-patient.component.css']
})
export class AllPatientComponent implements OnInit {
resP ;  resDs: any;
  constructor(private PService: PatientService) { }

  ngOnInit() {
    // this.PService.getAllPatient().subscribe(async data => {
    //   this.resP = data;
    //   console.log(this.resP) ;
    // }) ;
       this.PService.getAllDoctors().subscribe(async data1 => {
        this.resDs = data1 ;
        console.log(this.resDs) ;
    });
  }

}
