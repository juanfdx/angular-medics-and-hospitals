import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];



/**
* si no usaramos el menu que viene del backend por el localstorage
*/
  // public menu: any[] = [

  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Main', url: '/' }
  //     ]
  //   },
  //   {
  //     title: 'Maintenance',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Users', url: 'users' },
  //       { title: 'Hospitals', url: 'hospitals' },
  //       { title: 'Medics', url: 'medics' },
  //     ]
  //   }
  // ];

  constructor(private router: Router) { }

  //METHODS:

  loadMenu() {

    this.menu = JSON.parse(localStorage.getItem('menu')!);

    if (this.menu.length === 0 || localStorage.getItem('menu') === null) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    }

  }

}
