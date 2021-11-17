import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public user!: User; 

  constructor(private userService: UserService) {
    //podemos obtener la imagen de la propiedad user instanciada en el servicio
    this.user = userService.user;
    
   }

  ngOnInit(): void {
  }

  //Methods:
  logout() {
    this.userService.logout();
  }

}
