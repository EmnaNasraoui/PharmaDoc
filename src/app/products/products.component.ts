import { Component, OnInit } from '@angular/core';
import { PharmacyService } from '../pharmacy.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', 'cart.scss']
})
export class ProductsComponent implements OnInit {
  id_product: any;
  products: any;
  produits: any;
  constructor(private pharmacyService: PharmacyService, public authService: AuthService) { }

  ngOnInit() {
    this.products = this.pharmacyService.CartProductNumber;
    this.produits = this.authService.ConnectedToken.data;
    console.log('produit', this.produits);
   console.log('this.products', this.products);
   console.log('price', this.authService.ConnectedToken['price']);

      let total = 0;
      for (let i = 0; i < this.produits.length; i++) {
        const product = this.produits[i];
        total += (product.productName.Price * product.Quantity);
      }
      console.log(total);
      return total;
    }
}

