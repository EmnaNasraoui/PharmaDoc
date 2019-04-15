import { Component, OnInit } from '@angular/core';
import { PharmacyService } from '../pharmacy.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css','cart.scss']
})
export class ProductsComponent implements OnInit {
  id_product: any;
  products: any;
  constructor(private pharmacyService: PharmacyService,public authService: AuthService) { }

  ngOnInit() {
    this.products = this.pharmacyService.CartProductNumber;
   console.log('this.products', this.products)
   }

}
