import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import {TranslateService} from '@ngx-translate/core';
import { ToggleMenuService } from '../../services/toggle-menu.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  public user!: User; 
  public langActive: string = 'es';

  //observable a de-suscribirse
  private toggleObs$!: Subscription;


  constructor(private userService: UserService,
              private router: Router,
              private translateService: TranslateService,
              private toggleMenuService: ToggleMenuService) {

    //podemos obtener la imagen de la propiedad user instanciada en el servicio
    this.user = userService.user;
 
   }

  ngOnInit(): void {

    this.toggleObs$ = this.toggleMenuService.toggleMenuEvent
                          .subscribe({
                            next: (res: any) => this.toggleIconMenu()
                            
                          })

  }

  ngOnDestroy(): void {
    //hay que de-suscribirse de cada observer cuando se destruye el componente
    this.toggleObs$.unsubscribe();
  }



  //METHODS:

  searchAll(term: string): void {
    if (term.length === 0) { return; }
    //vamos a la ruta y mandamos el termino en la url
    this.router.navigateByUrl(`/dashboard/search/${ term }`); 
  }


  selectLanguage(lang:string) {
    this.langActive = lang;
    this.translateService.use(lang);
  }

  //cambia el icono del menu, al cerrarse quita la "X"
  toggleIconMenu() {
    let menu = document.getElementById('menu-icon');
    menu?.classList.remove("ti-close");
    menu?.classList.add("ti-menu");  
  }


  logout(): void {
    this.userService.logout();
  }

}
