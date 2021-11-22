import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GetHospitals } from '../interfaces/get-hospitals.interface';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  public base_url: string = environment.base_url;


  constructor(private http: HttpClient) { }


  //GETTERS:
  public get token() : string {
    return localStorage.getItem('token') || '';
  }
  
  public get headers() : object {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  
//SERVICES:
/*===========================================================
  GET HOSPITALS - optendremos las images mediante un pipe
============================================================*/
  getHospitals(from: number = 0): Observable<GetHospitals> {
    return this.http.get<GetHospitals>(`${this.base_url}/hospitals?from=${from}`, this.headers)
  }


/*===========================================================
  CREATE HOSPITAL
============================================================*/
  createHospital(name: string): Observable<any> {
    return this.http.post(`${this.base_url}/hospitals`, { name }, this.headers)
  }


/*===========================================================
  UPDATE HOSPITAL
============================================================*/
  updateHospital(id: string, name: string): Observable<any> {
    return this.http.put(`${this.base_url}/hospitals/${id}`, { name }, this.headers)
  }


/*===========================================================
  DELETE HOSPITAL
============================================================*/
  deleteHospital(id: string): Observable<any> {
    return this.http.delete(`${this.base_url}/hospitals/${id}`, this.headers)
  }

}

