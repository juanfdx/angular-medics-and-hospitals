import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Medic } from '../models/medic.model';
import { GetMedics } from '../interfaces/get-medics.interface';
import { medicForm } from '../interfaces/medic-form.interface';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MedicService {

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
  GET MEDICS - optendremos las images mediante un pipe
============================================================*/
  getMedics(from: number = 0): Observable<GetMedics> {
    return this.http.get<GetMedics>(`${this.base_url}/medics?from=${from}`, this.headers)
  }


/*===========================================================
  GET ONE MEDIC - by id
============================================================*/
  getMedic(medicId: string): Observable<any> {
    return this.http.get(`${this.base_url}/medics/${medicId}`, this.headers)          
  }


/*===========================================================
  CREATE MEDIC
============================================================*/
  createMedic(formData: medicForm): Observable<any> {
    return this.http.post(`${this.base_url}/medics`, formData, this.headers)
  }


/*===========================================================
  UPDATE MEDIC
============================================================*/
  updateMedic( medicId: string, formData: medicForm): Observable<any> {
    return this.http.put(`${this.base_url}/medics/${medicId}`, formData, this.headers)
  }


/*===========================================================
  DELETE MEDIC
============================================================*/
deleteMedic(id: string): Observable<any> {
  return this.http.delete(`${this.base_url}/medics/${id}`, this.headers)
}


}
