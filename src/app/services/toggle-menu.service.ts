import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleMenuService {
  //servicio para cambiar el icono de "X" a "Hanburguesa", cuando 
  //se hace click en un sub menu o se haga scroll, al cerrarse el menu

  public toggleMenuEvent: EventEmitter<string> = new EventEmitter();


  constructor() { }


  
}
