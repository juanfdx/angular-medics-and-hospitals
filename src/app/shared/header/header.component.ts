import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public user!: User; 
  public langActive: string = 'es';


  constructor(private userService: UserService,
              private router: Router,
              private translateService: TranslateService) {
    //podemos obtener la imagen de la propiedad user instanciada en el servicio
    this.user = userService.user;

    
   }

  ngOnInit(): void {

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


  logout(): void {
    this.userService.logout();
  }

}
