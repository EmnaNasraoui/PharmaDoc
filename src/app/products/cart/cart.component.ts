import { Component, OnInit } from '@angular/core';
import { PharmacyService } from 'src/app/pharmacy.service';
import { AuthService } from 'src/app/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  Id_Cart: any;
  results: any;
  Products: any;
  QuantityForm: FormGroup;
  total: number;
  constructor(private pharmacyService: PharmacyService, public authService: AuthService) {
    this.QuantityForm = new FormGroup({
      Quantity: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  ngOnInit() {
    this.Id_Cart = this.authService.ConnectedToken.id_Cart;
    console.log('this.Id_Cart', this.Id_Cart)
    this.pharmacyService.getMyCartById(this.Id_Cart).subscribe((data: any) => {
      this.results = data;
      console.log(data)
      this.Products = data.My_Products;
      console.log(this.Products);
      this.authService.ConnectedToken.data = this.Products;
      console.log('aaaaa', this.authService.ConnectedToken.data)
    });
  }
  DeleteFormCart(id_product) {
    this.Id_Cart = this.authService.ConnectedToken.id_Cart;
    this.pharmacyService.DeleteProductFromCart(id_product, this.Id_Cart).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    })

  }
  getTotal(price, quantity) {
    this.total = price * quantity;
    return this.total;
  }
  ChangeQuantity(id_product, i) {
    if (this.QuantityForm.value.Quantity > 0) {
      this.Id_Cart = this.authService.ConnectedToken.id_Cart;
      const obj = {
        productName: id_product,
        Quantity: this.QuantityForm.value.Quantity
      };
      this.pharmacyService.ChangeQuantityOfProduct(id_product, this.Id_Cart, i, obj).subscribe((data: any) => {
        console.log('change', data);
        this.ngOnInit();
      });
    }
  }
  GetAllTotal() {
    let total = 0;
    for (let i = 0; i < this.Products.length; i++) {
      const product = this.Products[i];
      total += (product.productName.Price * product.Quantity);
    }
    this.authService.ConnectedToken['price'] = total;
    console.log(total);
    return total;
  }
}
