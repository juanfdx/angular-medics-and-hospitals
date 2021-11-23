import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService,
              private route: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {

      // return (this.userService.role === 'ADMIN_ROLE') ? true : false;
    
      //protegemos la ruta dahsboard/users para no entre si no es Admin
      if (this.userService.role === 'ADMIN_ROLE') {
        return true;

      } else {
        this.route.navigateByUrl('/dashboard');
        return false;

      }
  }
  
}
