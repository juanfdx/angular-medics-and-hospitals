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
import { GetUsers } from '../interfaces/get-users.interface';


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



  //GETTERS:
  public get token() : string {
    return localStorage.getItem('token') || '';
  }
 
  public get userId() : string {
    return this.user.id || '';
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
  RENEW TOKEN
============================================================*/
  validateToken(): Observable<boolean> {

    return this.http.get(`${this.base_url}/login/renew`, this.headers)

        .pipe(
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
    
    return this.http.put<ProfileForm>(`${this.base_url}/users/${this.userId}`, data, this.headers);
  }


/*===========================================================
  CHANGE USER ROLE
============================================================*/
  changeUserRole( user: User) {

    return this.http.put(`${this.base_url}/users/${user.id}`, user, this.headers);
  }


/*===========================================================
  LOAD USERS
============================================================*/
  getUsers( from: number = 0): Observable<GetUsers> {
    return this.http.get<GetUsers>(`${this.base_url}/users?from=${from}`, this.headers)
              .pipe(
                map( res => {
                  
                  //creamos una instancia de cada usuario del arreglo, tendremos todas sus propiedades a mano
                  const users = res.users.map( 
                    user => new User(user.name, user.lastName, user.email, user.password = '', user.role, user.image, user._id)
                  );

                  //mantenemos el tipado de la respuesta (tipo: GetUsers)
                  return {
                    ok: res.ok,
                    total: res.total,
                    users: users //mandamos los users instanciados
                  };
                })
              )
  }


/*===========================================================
  DELETE USER
============================================================*/
  deleteUser( user: User ) {
    return this.http.delete(`${this.base_url}/users/${user.id}`, this.headers);
    
  }


/*===========================================================
  LOGOUT
============================================================*/
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }



}

