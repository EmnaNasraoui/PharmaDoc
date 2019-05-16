import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  ID: any;
  id_Doctor:any;
  setid(id) {
    this.ID = id;
  }
  getid() {
    return this.ID;
  }
  constructor(private http: HttpClient) { }

  getDoctors() {
    return this.http.get('http://localhost:3000/doctor/getDoctors');
  }

  getDoctorById(ID) {
    return this.http.get(`http://localhost:3000/doctor/getDoctor/${ID}`);

  }

  AddDoctorSchedule(id_Doctor,Doctor) {
    return this.http.post(`http://localhost:3000/doctor/editDoctorTimes/${id_Doctor}`,Doctor);

  }
  AddPratnership(id_doctor, id_pharmacy, obj){
    return this.http.post(`http://localhost:3000/doctor/partnerShipToValidate/${id_doctor}/${id_pharmacy}`, obj);
  }
}
