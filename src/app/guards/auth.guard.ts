import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private userService: UserService,
              private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
    return this.userService.validateToken()
              .pipe(
                tap( isAuthenticated => {
                  //si no esta autenticado lo manda al login
                  if (!isAuthenticated) {
                    this.router.navigateByUrl('/login');
                  }
                })
              )
  }
  
}
