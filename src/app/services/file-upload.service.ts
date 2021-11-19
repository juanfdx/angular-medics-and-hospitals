import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  //GETTER:
  public get token() : string {
    return localStorage.getItem('token') || '';
  }

  
//SERVICES:
/*===========================================================
  UPLOAD IMAGE
============================================================*/
  uploadImage( type: string, id: string, image: any ): Observable<any> {

    //tratamos la imagen a subir
    const data = new FormData();
    data.append('image', image);

    return this.http.put(`${ base_url }/upload/${ type }/${ id }`, data, {
      headers: {
        'x-token': this.token
      }
    })
  }


}
