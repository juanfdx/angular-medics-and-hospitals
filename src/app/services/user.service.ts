import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public base_url: string = environment.base_url;

  constructor(private http: HttpClient,
              private router: Router) { }


//SERVICES:
  //renew token
  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${this.base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (res:any) => {
        localStorage.setItem('token', res.token);
      }),
      map(res => true),
      catchError( error => of(false))
    )
  }

  //user login
  login(formData: LoginForm) {
    return this.http.post(`${this.base_url}/login`, formData)
                .pipe(
                  tap( (res: any) => {
                    localStorage.setItem('token', res.token)         
                  })
                )
  }

  //user register
  createUser( formData: RegisterForm) { 
    return this.http.post(`${this.base_url}/users`, formData)
              .pipe(
                tap( (res: any) => {
                  localStorage.setItem('token', res.token)         
                })
              )
  }

  //logout
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }



}

