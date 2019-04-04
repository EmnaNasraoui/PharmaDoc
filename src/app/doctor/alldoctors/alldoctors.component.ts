import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alldoctors',
  templateUrl: './alldoctors.component.html',
  styleUrls: ['./alldoctors.component.css']
})
export class AlldoctorsComponent implements OnInit {
  results:[];
  getpara;
  id;
  constructor(private apiService: DoctorService,private router: Router) { }

  ngOnInit() {
    this.apiService.getDoctors().subscribe((doc:any) => {
      console.log(doc);
      this.results = doc;
   });
  }
  gotoDoctorbyid(id) {
    // this.id = param.get('id');
    console.log(id);
    // this.apiService.setid(id);
    this.router.navigate(['/doctor/singledoctor/'+ id]);
  }
}
