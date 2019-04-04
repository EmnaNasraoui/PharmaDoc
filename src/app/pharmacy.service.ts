import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(private http : HttpClient) { }

  GetPharmacyById(id_pharmacy){
    return this.http.get(`http://localhost:3000/pharmacy/getPharmacyById/${id_pharmacy}`)
  }
  EditPharmacyById(id,Pharmacy){
    return this.http.post(`http://localhost:3000/pharmacy/editPharmacyTimes/${id}`,Pharmacy)
  }
}
