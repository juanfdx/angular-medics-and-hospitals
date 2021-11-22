import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';



@Injectable({
  providedIn: 'root'
})
export class SearchsService {

  public base_url: string = environment.base_url;
  public result: any[] = [];
  


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
  TRANSFORM DATA
============================================================*/
  private transformUsers( data: any[], total: number): User[] {
    
    const datUser = data.map(
      user => new User(user.name, user.lastName, user.email, user.password = '', user.role, user.image, user._id)
      );   
      this.result = [datUser, total];

    return this.result;
  }



/*===========================================================
  SEARCH
============================================================*/
  search( type: string, term: string, from: number = 0) {

    return this.http.get(`${this.base_url}/all/collection/${type}/${term}?from=${from}`, this.headers)
                .pipe(
                  map( (res: any) => {
                    
                    switch (type) {
                      case 'users':
                        return this.transformUsers( res.data, res.total );
                       
                      case 'hospitals':
                        return res;
                        
                      case 'medics':
                        return res;

                      default:
                        return [];
                    }


                  })
                )
  }



}
