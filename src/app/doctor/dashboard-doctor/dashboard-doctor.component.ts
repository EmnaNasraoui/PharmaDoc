import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/doctor.service';


@Component({
  selector: 'app-dashboard-doctor',
  templateUrl: './dashboard-doctor.component.html',
  styleUrls: ['./dashboard-doctor.component.css']
})
export class DashboardDoctorComponent implements OnInit {
  ID: any;
  results;
  constructor(private apiService: DoctorService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.ID = this.route.snapshot.paramMap.get('id');
    this.apiService.getDoctorById(this.ID).subscribe((data: any) => {
      console.log(data);
      this.results = [data];
    });
  }
}
