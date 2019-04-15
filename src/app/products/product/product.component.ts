import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PharmacyService } from 'src/app/pharmacy.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id_product: any;
  products: any;

  constructor( private router : ActivatedRoute, private pharmacyService : PharmacyService) { }

  ngOnInit() {
    this.id_product = this.router.snapshot.paramMap.get('id')
    this.pharmacyService.ProductById(this.id_product).subscribe((data:any)=>{
      this.products= data 
      console.log(data)})
  }

}
