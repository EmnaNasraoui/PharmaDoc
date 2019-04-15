import { Component, OnInit } from '@angular/core';
import { PharmacyService } from 'src/app/pharmacy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-pharmacy',
  templateUrl: './all-pharmacy.component.html',
  styleUrls: ['./all-pharmacy.component.css']
})
export class AllPharmacyComponent implements OnInit {
  results: any;

  constructor(private PharmacyService : PharmacyService, private router : Router) { }

  ngOnInit() {
    this.PharmacyService.GetAllPharmacy().subscribe((data:any)=>{
      this.results = data
      console.log(data);
    })
  }
  gotoPharmacybyid(id) {
    // this.id = param.get('id');
    console.log(id);
    // this.apiService.setid(id);
    this.router.navigate(['/pharmacy/viewProfile/'+ id]);
  }
}
