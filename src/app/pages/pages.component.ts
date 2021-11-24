import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from 'src/app/services/sidebar.service';

//funcion que hace que se carguen los plugins de jquery,etc de la plantilla
//se declara aca pq en esta pagina se necesitan esos plugins o podria ser en app.component.ts
declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public year: number = new Date().getFullYear();

  constructor(private settingsService: SettingsService,
              private sidebarService: SidebarService) { }

  ngOnInit(): void {
    //esta funcion es global declarada en custom.js , cargada en index.html linea 52
    //e inicia los plugins de jQuery que vienen instalados en la plantilla
    customInitFunctions();

    this.sidebarService.loadMenu();
  }

}
