import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PharmacyService } from 'src/app/pharmacy.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth.service';
import { Options } from 'ng5-slider';
import { CheckBoxFiltrePipe } from 'src/app/check-box-filtre.pipe';
import { FiltrePricePipe } from 'src/app/filtre-price.pipe';
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
  minValue: number = 0;
  maxValue: number = 3000;
  options: Options = {
    floor: 0,
    ceil: 3000
  };
  @Output() ownProducts = new EventEmitter<number>();
  products: any;
  filteredProducts:any;
  productFilter: [];
  Id_cart: any;
  CartProduct: any;
  checked;
  YourListe:any;
yourFilteredListe:any;
searchJson = { Product_Category: [] };
searchByPrice = { Price: [] };
  res: void;
  constructor(private pharmacyService: PharmacyService, private authService: AuthService) { }

  ngOnInit() {
    this.pharmacyService.GetAllProducts().subscribe((data: any) => {
      this.products = data;
      this.filteredProducts = data;
      this.productFilter = data;
    });
    console.log(this.authService.ConnectedToken)

    this.Id_cart = this.authService.ConnectedToken.id_Cart;
    console.log(this.Id_cart)
    this.pharmacyService.getMyCartById(this.Id_cart).subscribe((data: any) => {
      this.CartProduct = data.My_Products.length;
      // console.log( this.pharmacyService.CartProductNumber);
      console.log('data', data);
      this.res = data.My_Products;
      console.log(this.res);
      console.log('number', data.My_Products);
      this.authService.ConnectedToken['ownProducts'] = this.CartProduct;
      this.authService.ConnectedToken.data = this.res;

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
  addToFilter(filterValue) {
    // this.filteredProducts = this.products;
    let arrayCol: any[] = <Array<any>>this.searchJson['Product_Category'];
    if (arrayCol.includes(filterValue)) {
      arrayCol = arrayCol.filter(elem => elem !== filterValue);
    } else {
      arrayCol.push(filterValue);
    }
    this.searchJson['Product_Category'] = arrayCol;
    const p = new CheckBoxFiltrePipe();
    this.filteredProducts = p.transform(this.products, this.searchJson);
  }
 /*  addToFilterPrice(f,y) {
    // this.filteredProducts = this.products;
    let arrayCol: any[] = <Array<any>>this.searchByPrice['Price'];
    if (arrayCol.includes(f) && arrayCol.includes(y)) {
      arrayCol = arrayCol.filter((elem => elem !== f ) && (elem => elem !== y));
    } else {
      arrayCol.push(f,y);
    }
    this.searchByPrice['Price'] = arrayCol;
    const p = new CheckBoxFiltrePipe();
    this.filteredProducts = p.transform(this.products, this.searchByPrice);
  } */
  valueChange($event) {
    console.log(this.minValue, this.maxValue);
    const p = new FiltrePricePipe();
    this.filteredProducts = p.transform(this.products, this.minValue, this.maxValue);
  }
}
