import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

import { SidebarService } from 'src/app/services/sidebar.service';
import { ToggleMenuService } from 'src/app/services/toggle-menu.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public user!: User; 
  //no lo usamos pq ahora lo traemos directo del backend
  // public menuItems: any[] = [];

  constructor(public sidebarServices: SidebarService,
              private userService: UserService,
              private toggleMenuService: ToggleMenuService) { 

    this.user = userService.user;
    // this.menuItems = this.sidebarServices.menu;
  }

  ngOnInit(): void {
  }

  //Methods:
  //esconde el menu navbar para moviles
  collapse() {
    let body = document.body;
    body.classList.remove("show-sidebar");
    
    this.toggleMenuService.toggleMenuEvent.emit('toggle');
  }


  logout() {
    this.userService.logout();
  }
}
