import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {
  //modal oculto por defecto, modal-image.component.html linea 2
  private _hideModal: boolean = true;

  public base_url: string = environment.base_url;

  public type: string = '';
  public id: string = '';
  public image: string = '';

  public newImageEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }
  

  public get hideModal() : boolean {
    return this._hideModal;
  }
  

//SERVICES:
/*===========================================================
  OPEN MODAL
============================================================*/
  openModal( type: string, id: string, image: string = 'no-image') {
    this._hideModal = false;
    this.type = type;
    this.id = id;
   
    this.image = `${ this.base_url }/upload/${ type }/${ image }`;
  }


/*===========================================================
  CLOSE MODAL
============================================================*/
  closeModal() {
    this._hideModal = true;
  }

}
