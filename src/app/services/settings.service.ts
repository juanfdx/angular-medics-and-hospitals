import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  //usamos vanilla javascript para seleccionar el tag link en index.html linea 17
  private linkTheme = document.querySelector('#theme');

  constructor() { 
    //si hay tema lo asigna sino usa el que esta por defecto
    const url =  localStorage.getItem('theme') || './assets/css/colors/blue-dark.css';
    this.linkTheme?.setAttribute('href', url);
  }

  //Services:
  changeTheme(theme: string): void {

    const url = `./assets/css/colors/${theme}.css`; 
    //cambiamos el href="" del link en index.html linea 17
    this.linkTheme?.setAttribute('href', url);
    //para que se mantenga el tema seleccionado al recargar la pagina
    localStorage.setItem('theme', url);

    this.checkCurrentThem();
  }


  checkCurrentThem(): void {

    //seleccionamos todos los elementos a por su clase en comun "selector"
    const links = document.querySelectorAll('.selector');
    
    links.forEach( (elem) => {
      //si hay un check marcado anterior lo quitamos (clase working)
      elem.classList.remove('working');

      //buscamos que boton coincide con el tema actual
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      //si el tema de ese boton coincide con el tema actual, se agrega el check sobre el
      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    }); 
  }



}
