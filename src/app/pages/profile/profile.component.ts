import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;
  public user!: User;
  public uploadImage!: File;
  public imageTemp: any;


  constructor(private fb: FormBuilder,
              private userService: UserService,
              private fileUploadService: FileUploadService) { 
    
    //user que esta referenciado en toda la app
    this.user = userService.user;
  }


  ngOnInit(): void {

    this.profileForm = this.fb.group({
      name: [ this.user.name , Validators.required ], 
      lastName: [this.user.lastName , Validators.required ],
      email: [this.user.email, [Validators.required, Validators.email] ],
    })
  }

  //METHODS:
  updateProfile() {

    this.userService.updateUser( this.profileForm.value )
        .subscribe({
          next: res => {
            const { name, lastName, email } = this.profileForm.value;
            this.user.name = name;
            this.user.lastName = lastName;
            this.user.email = email;

            Swal.fire('Exito!!!', 'Usuario actualizado.', 'success')
          },
          error: err => Swal.fire('Error!!!', 'No se pudo actualizar', 'error')        
          
        });
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
    this.fileUploadService.uploadImage( 'users', this.user.id!, this.uploadImage)
        .subscribe({

          next: res => {
            this.user.image = res.fileName;
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Imagen actualizada con éxito!',
              showConfirmButton: false,
              timer: 2000
            })
          },
              
          error: err => Swal.fire('Error!!!', 'No se pudo subir la imagen!', 'error')               
        });
  }

}
