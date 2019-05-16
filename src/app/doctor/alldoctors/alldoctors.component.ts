import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/doctor.service';
import { Router } from '@angular/router';
import { ChechBoxDoctorPipe } from 'src/app/chech-box-doctor.pipe';
export interface Role {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-alldoctors',
  templateUrl: './alldoctors.component.html',
  styleUrls: ['./alldoctors.component.css']
})

export class AlldoctorsComponent implements OnInit {
  results:[];
  getpara;
  id;
  searchJson = { specialty: [] };
  filteredSpecialty:any;
  Specialty: any;


  constructor(private apiService: DoctorService,private router: Router) { }

  ngOnInit() {
    this.apiService.getDoctors().subscribe((doc: any) => {
      console.log(doc);
      this.results = doc;
      this.filteredSpecialty = doc;
   });
  }
  gotoDoctorbyid(id) {
    // this.id = param.get('id');
    console.log(id);
    // this.apiService.setid(id);
    this.router.navigate(['/doctor/singledoctor/' + id]);
  }

   addToFilter(filterValue) {
    let arrayCol: any[] = <Array<any>>this.searchJson['specialty'];
    if (arrayCol.includes(filterValue)) {
      arrayCol = arrayCol.filter(elem => elem !== filterValue);
    } else {
      arrayCol.push(filterValue);
    }
    this.searchJson['specialty'] = arrayCol;
    const p = new ChechBoxDoctorPipe();
    this.filteredSpecialty = p.transform(this.results, this.searchJson);
  }
}
