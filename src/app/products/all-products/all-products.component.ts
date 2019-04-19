import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PharmacyService } from 'src/app/pharmacy.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth.service';
export interface Role {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  @Output() ownProducts = new EventEmitter<number>();
  products: any;
  productFilter: [];
  Id_cart: any;
  CartProduct: any;
  Product_Categories: Role[] = [
    { value: 'Drug', viewValue: ' Drug' },
    { value: 'sirop', viewValue: ' Sirop' },
    { value: 'injectables', viewValue: ' Injectables' },
    { value: 'Poudre', viewValue: ' Poudre' },
    { value: 'dermiques', viewValue: ' Dermiques' },
    { value: 'Bio Product', viewValue: ' Bio Product' },
    { value: 'Aesthetic Product', viewValue: ' Aesthetic Product' },
    { value: 'Accessory', viewValue: ' Accessory' },
  ];
  constructor(private pharmacyService: PharmacyService, private cookieService: CookieService, private authService: AuthService) { }

  ngOnInit() {
    this.pharmacyService.GetAllProducts().subscribe((data: any) => {
      this.products = data;
      this.productFilter = data;
    });
    this.Id_cart = this.authService.ConnectedToken.id_Cart;
    console.log(this.Id_cart)
    this.pharmacyService.getMyCartById(this.Id_cart).subscribe((data: any) => {
      this.CartProduct = data.My_Products.length;
      // console.log( this.pharmacyService.CartProductNumber);
      console.log('data', data);
      console.log('number', data.My_Products);
      this.authService.ConnectedToken['ownProducts'] = this.CartProduct;
    });
  }
  AddToCart(id_product) {
    console.log('product', id_product);
    this.Id_cart = this.authService.ConnectedToken.id_Cart;
    console.log('this.Id_cart', this.Id_cart);
   const obj = {
      productName: id_product
    };
    console.log('obj', obj);
    this.pharmacyService.AddToMyCrat(id_product, this.Id_cart, obj).subscribe((data: any) => {
      console.log('2', data);
      alert('Added with success');
      this.ngOnInit();
    });
  }
}
