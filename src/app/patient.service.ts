import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getAllPatient(): Observable<any> {
    return this.http.get('http://localhost:3000/patient/get_list_patient');
}

getAllDoctors(): Observable<any> {
  return this.http.get('http://localhost:3000/patient/get_list_doctor');
}

getRDV(DoctorID , PatientID): Observable<any> {
  return this.http.get('http://localhost:3000/patient/getRDV/' + DoctorID + '/' + PatientID );
}

getDoctorById(DoctorID):Observable<any> {

  return this.http.get('http://localhost:3000/patient/get_doctor/' + DoctorID );

}
}
