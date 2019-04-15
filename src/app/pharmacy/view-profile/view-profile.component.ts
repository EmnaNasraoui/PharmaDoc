import { Component, OnInit } from '@angular/core';
import { PharmacyService } from 'src/app/pharmacy.service';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  id_pharmacy: any;
  results: any;
  products: any;

  constructor(private pharmacyService : PharmacyService, private router : ActivatedRoute) { }

  ngOnInit() {
    this.id_pharmacy = this.router.snapshot.paramMap.get('id')
    this.pharmacyService.GetPharmacyById(this.id_pharmacy).subscribe((data: any) => {
      this.results = [data];
    })
    this.pharmacyService.GetProductById(this.id_pharmacy).subscribe((data:any)=>{
      this.products = data
      console.log(data)
    })
  }

}
