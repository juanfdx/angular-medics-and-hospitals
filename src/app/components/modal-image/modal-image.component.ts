import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public uploadImage!: File;
  public imageTemp: any;
  
  constructor(public modalImageService: ModalImageService,
              private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }



  //METHODS:
  closeModal(): void {
    this.imageTemp = null;
    this.modalImageService.closeModal();
  }


  changeImage(event: any) {
    this.uploadImage = event.target.files[0];
    // const file = event.target.files[0];

    //PARA VER INSTANTANEAMENTE LA IMAGEN QUE VAMOS A GUARDAR
    //si cancelamos la imagen nueva, para que muestre la anterior al momento
    if(!this.uploadImage) {
      this.imageTemp = null;

    } else {
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadImage);
      reader.onloadend = () => {
      this.imageTemp = reader.result;
      }
    } 
  }


  updateImage() {

    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService.uploadImage( type, id, this.uploadImage)
        .subscribe({

          next: res => {    
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Imagen actualizada con éxito!',
              showConfirmButton: false,
              timer: 2000
            })

            //emitimos un evento para que se actualize el componente
            this.modalImageService.newImageEvent.emit(res.fileName);

            this.closeModal();
          },
              
          error: err => Swal.fire('Error!!!', 'No se pudo subir la imagen!', 'error')               
        });
  }

}
