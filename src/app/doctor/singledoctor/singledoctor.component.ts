import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/doctor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singledoctor',
  templateUrl: './singledoctor.component.html',
  styleUrls: ['./singledoctor.component.css']
})
export class SingledoctorComponent implements OnInit {
  ID:any;
  results;
  constructor(private apiService: DoctorService,private router: ActivatedRoute) { }

  ngOnInit() {
    this.ID = this.router.snapshot.paramMap.get('id')
    this.apiService.getDoctorById(this.ID).subscribe((data: any) => {
    console.log(data);
    this.results = [data];
  });

}
}