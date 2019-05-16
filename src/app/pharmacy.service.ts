import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {
  CartProductNumber: any;

  constructor(private http: HttpClient) {
    this.CartProductNumber = 0;
  }

  GetPharmacyById(id_pharmacy) {
    return this.http.get(`http://localhost:3000/pharmacy/getPharmacyById/${id_pharmacy}`);
  }
  EditPharmacyById(id, Pharmacy) {
    return this.http.post(`http://localhost:3000/pharmacy/editPharmacyTimes/${id}`, Pharmacy);
  }
  AddProduct(id, Product) {
    return this.http.post('http://localhost:3000/pharmacy/addProduct/' + id, Product);
  }
  GetProductById(id_pharmacy) {
    return this.http.get('http://localhost:3000/pharmacy/getProductById/' + id_pharmacy);
  }
  DeleteProduct(id_product) {
    return this.http.get('http://localhost:3000/pharmacy/DeleteProduct/' + id_product);
  }
  EditProducts(id_product, Product) {
    return this.http.post('http://localhost:3000/pharmacy/EditProduct/' + id_product, Product);
  }
  GetAllPharmacy() {
    return this.http.get('http://localhost:3000/pharmacy/allPharmacy');
  }
  GetAllProducts() {
    return this.http.get('http://localhost:3000/pharmacy/allProducts');
  }
  ProductById(id_product) {
    return this.http.get('http://localhost:3000/pharmacy/GerProductById/' + id_product);
  }
  AddToMyCrat(id_product, id_cart, obj) {
    return this.http.post(`http://localhost:3000/pharmacy/addProductToMyCart/${id_product}/${id_cart}`, obj);
  }
  getMyCartById(id_Cart) {
    return this.http.get('http://localhost:3000/pharmacy/GetMyCartById/' + id_Cart);
  }
  DeleteProductFromCart(id_product, id_cart) {
    return this.http.get(`http://localhost:3000/pharmacy/deleteProductFromCart/${id_product}/${id_cart}`);
  }
  ChangeQuantityOfProduct(id_product, id_cart, index, Quantity) {
    return this.http.post(`http://localhost:3000/pharmacy/EditProductQuantityOfMyCart/${id_product}/${id_cart}/${index}`, Quantity);
  }
  acceptParternship(id_partnership) {
    return this.http.post(`http://localhost:3000/pharmacy/ValidatePartnership/${id_partnership}`, '');
  }
  deleteParternship(id_pharmacy, id_doctor, id_partnership) {
    return this.http.post(`http://localhost:3000/pharmacy/deleteaPartnership/${id_pharmacy}/${id_doctor}/${id_partnership}`, '');
  }
  rejectPartnership(id_partnership) {
    return this.http.post(`http://localhost:3000/pharmacy/RejectPartnership/${id_partnership}`, '');
  }
}
