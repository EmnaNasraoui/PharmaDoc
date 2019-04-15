import { Component, OnInit } from '@angular/core';
import { PharmacyService } from 'src/app/pharmacy.service';
import * as jwt_decode from 'jwt-decode'
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
export interface Roles {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-pharmacy-profile',
  templateUrl: './pharmacy-profile.component.html',
  styleUrls: ['./pharmacy-profile.component.css']
})
export class PharmacyProfileComponent implements OnInit {
  Days: Roles[] = [
    { value: 'monday', viewValue: 'Monday' },
    { value: 'tuesday', viewValue: ' Tuesday' },
    { value: 'thursday', viewValue: 'Thursday' },
    { value: 'friday', viewValue: 'Friday' },
    { value: 'saturday', viewValue: ' Saturday' },
    { value: 'sunday', viewValue: ' Sunday' }
  ];
  index;
  imageChoice = 0;
  TimeOfOpenings: Roles[] = [
    { value: '00', viewValue: ' 00' },
    { value: '01', viewValue: ' 01' },
    { value: '02', viewValue: ' 02' },
    { value: '03', viewValue: ' 03' },
    { value: '04', viewValue: ' 04' },
    { value: '05', viewValue: ' 05' },
    { value: '06', viewValue: ' 06' },
    { value: '07', viewValue: ' 07' },
    { value: '08', viewValue: ' 08' },
    { value: '09', viewValue: ' 09' },
    { value: '10', viewValue: ' 10' },
    { value: '11', viewValue: ' 11' },
    { value: '12', viewValue: ' 12' },
    { value: '13', viewValue: ' 13' },
    { value: '14', viewValue: ' 14' },
    { value: '15', viewValue: ' 15' },
    { value: '16', viewValue: ' 16' },
    { value: '17', viewValue: ' 18' },
    { value: '19', viewValue: ' 19' },
    { value: '20', viewValue: ' 20' },
    { value: '21', viewValue: ' 21' },
    { value: '22', viewValue: ' 22' },
    { value: '23', viewValue: ' 23' },
    { value: '24', viewValue: ' 24' },
  ];
  TimeOfClosings: Roles[] = [
    { value: '00', viewValue: ' 00' },
    { value: '01', viewValue: ' 01' },
    { value: '02', viewValue: ' 02' },
    { value: '03', viewValue: ' 03' },
    { value: '04', viewValue: ' 04' },
    { value: '05', viewValue: ' 05' },
    { value: '06', viewValue: ' 06' },
    { value: '07', viewValue: ' 07' },
    { value: '08', viewValue: ' 08' },
    { value: '09', viewValue: ' 09' },
    { value: '10', viewValue: ' 10' },
    { value: '11', viewValue: ' 11' },
    { value: '12', viewValue: ' 12' },
    { value: '13', viewValue: ' 13' },
    { value: '14', viewValue: ' 14' },
    { value: '15', viewValue: ' 15' },
    { value: '16', viewValue: ' 16' },
    { value: '17', viewValue: ' 18' },
    { value: '19', viewValue: ' 19' },
    { value: '20', viewValue: ' 20' },
    { value: '21', viewValue: ' 21' },
    { value: '22', viewValue: ' 22' },
    { value: '23', viewValue: ' 23' },
    { value: '24', viewValue: ' 24' },

  ];

  Product_Categories: Roles[] = [
    { value: 'Drug', viewValue: ' Drug' },
    { value: 'sirop', viewValue: ' Sirop' },
    { value: 'injectables', viewValue: ' Injectables' },
    { value: 'Poudre', viewValue: ' Poudre' },
    { value: 'dermiques', viewValue: ' Dermiques' },
    { value: 'Bio Product', viewValue: ' Bio Product' },
    { value: 'Aesthetic Product', viewValue: ' Aesthetic Product' },
    { value: 'Accessory', viewValue: ' Accessory' },
  ];
  id_pharmacy: any;
  results: any;
  PharmacyForm: FormGroup;
  ProductForm : FormGroup;
  selectedImage: File;
  public imagePath;
  imgURL: any;
  public message: string;
  products: any;
  id_product: any;
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.imageChoice = 1;

    }
  }
  constructor(private pharmacyService: PharmacyService, private cookieService: CookieService) {
    this.PharmacyForm = new FormGroup({
      day: new FormControl(''),
      Time_Of_Opening: new FormControl(''),
      Time_Of_Closing: new FormControl(''),
    })
    this.ProductForm = new FormGroup({
      Name : new FormControl('', [Validators.required]),
      Price: new FormControl('', [Validators.required]),
      Date_Of_Entry: new FormControl('', [Validators.required]),
      Date_Of_Expiration: new FormControl('', [Validators.required]),
      Amount: new FormControl('', [Validators.required]),
      Product_Category: new FormControl('', [Validators.required]),
      Product_image: new FormControl(''),
      Description: new FormControl('',[Validators.required])
    })

  }

  ngOnInit() {
    this.id_pharmacy = jwt_decode(this.cookieService.get('token')).id.id_pharmacy
    this.pharmacyService.GetPharmacyById(this.id_pharmacy).subscribe((data: any) => {
      this.results = [data];
    })
    this.pharmacyService.GetProductById(this.id_pharmacy).subscribe((data:any)=>{
      this.products = data
      console.log(data)
    })
  }
  EditPharmacyProfile() {
    this.id_pharmacy = jwt_decode(this.cookieService.get('token')).id.id_pharmacy
    this.pharmacyService.EditPharmacyById(this.id_pharmacy, this.PharmacyForm.value).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit()
    })
  }
  selectedFile(event) {
    console.log(event.target.files[0])
    this.selectedImage = event.target.files[0]
  }
  AddProduct(){
    this.id_pharmacy = jwt_decode(this.cookieService.get('token')).id.id_pharmacy;
   const formData = new FormData();
   formData.append('Name',this.ProductForm.value.Name);
   formData.append('Price',this.ProductForm.value.Price);
   formData.append('Date_Of_Entry', this.ProductForm.value.Date_Of_Entry);
   formData.append('Date_Of_Expiration', this.ProductForm.value.Date_Of_Expiration);
   formData.append('Amount',this.ProductForm.value.Amount);
   formData.append('Product_Category', this.ProductForm.value.Product_Category);
   formData.append('Description',this.ProductForm.value.Description)
   formData.append('Product_image', this.selectedImage.name);
   formData.append('image', this.selectedImage);

   console.log(formData)
   this.pharmacyService.AddProduct(this.id_pharmacy,formData).subscribe((data:any)=>{
     console.log(data)
     this.ngOnInit()
   })
  }
  deleteProduct(id_product){
    console.log(id_product)
    this.pharmacyService.DeleteProduct(id_product).subscribe((data:any)=>{
      console.log(data)
      this.ngOnInit()
    })
  }
   getIndex(i,id_product){
console.log(id_product);
this.id_product = id_product;
  this.ProductForm.controls['Name'].setValue(this.products[i].Name);
   this.ProductForm.controls['Price'].setValue(this.products[i].Price);
     this.ProductForm.controls['Date_Of_Entry'].setValue(this.products[i].Date_Of_Entry);
     this.ProductForm.controls['Date_Of_Expiration'].setValue(this.products[i].Date_Of_Expiration);
     this.ProductForm.controls['Product_Category'].setValue(this.products[i].Product_Category);
    this.ProductForm.controls['Amount'].setValue(this.products[i].Amount);
    this.ProductForm.controls['Description'].setValue(this.products[i].Description);
     this.ProductForm.controls['Product_image'].setValue(this.products[i].Product_image);
   }
  EditProduct(id_product){
    console.log(this.id_product);
    const formData = new FormData();
    formData.append('Name',this.ProductForm.value.Name);
    formData.append('Price',this.ProductForm.value.Price);
    formData.append('Date_Of_Entry', this.ProductForm.value.Date_Of_Entry);
    formData.append('Date_Of_Expiration', this.ProductForm.value.Date_Of_Expiration);
    formData.append('Amount',this.ProductForm.value.Amount);
    formData.append('Product_Category', this.ProductForm.value.Product_Category);
    formData.append('Description',this.ProductForm.value.Description)
    if (this.selectedImage) {
      formData.append('Product_image', this.selectedImage.name);
      formData.append('image', this.selectedImage);
    }
    this.pharmacyService.EditProducts(this.id_product,formData).subscribe((data:any)=>{
      console.log(data);
      this.ngOnInit()
    })
  }
}
