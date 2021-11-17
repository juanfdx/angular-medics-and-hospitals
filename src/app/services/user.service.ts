import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { ProfileForm } from '../interfaces/profile-form.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {

/*
  este user es el que se ha logeado, lo instanciaremos con las propiedades  
  que vienen en la res y podran ser usadas en toda la aplicación.
*/
  public user!: User;
  public base_url: string = environment.base_url;

  constructor(private http: HttpClient,
              private router: Router) { }



  public get token() : string {
    return localStorage.getItem('token') || '';
  }
 
  public get userId() : string {
    return this.user.id || '';
  }
  
  
//SERVICES:
/*===========================================================
  RENEW TOKEN
============================================================*/
  validateToken(): Observable<boolean> {

    return this.http.get(`${this.base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (res:any) => {
        //destructuramos la res(es un user), para usar las propiedades en la instancia
        const { name, lastName, email, role, image = '', _id } = res.user;

        //creamos una instancia de usuario, y tendremos el usuario disponible en toda la app
        this.user = new User(name, lastName, email, '', role, image, _id);
        //tambien podremos usar los metodos que tenga la clase user y siempre que
        //estemos en una pagina autenticada dispondremos de la informacion del user
        
        localStorage.setItem('token', res.token);

        return true;
      }),
      catchError( error => of(false))
    )
  }


/*===========================================================
  LOGIN
============================================================*/
  login(formData: LoginForm) {
    return this.http.post(`${this.base_url}/login`, formData)
                .pipe(
                  tap( (res: any) => {
                    localStorage.setItem('token', res.token)         
                  })
                )
  }


/*===========================================================
  CREATE USER - user register
============================================================*/
  createUser( formData: RegisterForm) { 
    return this.http.post(`${this.base_url}/users`, formData)
              .pipe(
                tap( (res: any) => {
                  localStorage.setItem('token', res.token)         
                })
              )
  }


/*===========================================================
  UPDATE USER
============================================================*/
  updateUser( formData: ProfileForm): Observable<ProfileForm> {
    //agregamos el role al formData
    const data = {
      ...formData,
      role: this.user.role
    }
    
    return this.http.put<ProfileForm>(`${this.base_url}/users/${this.userId}`, data, {
      headers: {
        'x-token': this.token
      }
    })
  }


/*===========================================================
  LOGOUT
============================================================*/
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }



}

