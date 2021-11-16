import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any[] = [];

  constructor(private sidebarServices: SidebarService,
              private userService: UserService) { 

    this.menuItems = this.sidebarServices.menu;
  }

  ngOnInit(): void {
  }

  //Methods:
  logout() {
    this.userService.logout();
  }
}
