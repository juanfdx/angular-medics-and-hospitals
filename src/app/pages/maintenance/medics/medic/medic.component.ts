import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GetHospitals } from 'src/app/interfaces/get-hospitals.interface';
import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from 'src/app/models/medic.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicService } from 'src/app/services/medic.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';



@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: [
  ]
})
export class MedicComponent implements OnInit {

  public medicForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedHospital?: Hospital;
  public selectedMedic?: Medic;


  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicService: MedicService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    //obtenemos el id del medico que viene por la url
    this.activatedRoute.params.subscribe({
      next: ({ id }) => this.loadMedic( id )     
    });


    this.medicForm = this.fb.group({
      name: [ '' , Validators.required ], 
      lastName: [ '' , Validators.required ],
      hospital: [ '', [ Validators.required ] ],
    })

    this.getHospitals();

    //seleccionamos el hospital que coincida con el id seleccionado en el select
    this.medicForm.get('hospital')?.valueChanges.subscribe({
      next: hospitalId => {
        this.selectedHospital = this.hospitals.find( h => h._id === hospitalId ); 
      }
    });

  }


  //METHODS:
  loadMedic( id: string): void {
    
    //si le dio al boton create, no manda un id valido sino la palabra "new"
    if (id === 'new') { return;}

    this.medicService.getMedic( id )
        //un delay para que de tiempo a cargar el form antes que la imagen de hospital
        .pipe( delay(200))
        .subscribe({

      next: (res: any) => { 

        //si no existe o es un id invalido
        if (!res.medic) { 
           this.router.navigateByUrl(`/dashboard/medics`);
        }

        this.selectedMedic = res.medic;
        //llenamos el formulario con los valores de selectedMedic
        this.medicForm.patchValue(
          { name: this.selectedMedic!.name, 
            lastName: this.selectedMedic!.lastName,
            hospital: this.selectedMedic!.hospital?._id
          });
      },

      error: res => {
        this.router.navigateByUrl(`/dashboard/medics`);
      }
    })
  }


  getHospitals(): void {
    //cargamos los hospitales, para luego mostrarlos en el select
    this.hospitalService.getHospitals(). subscribe({
      next: (res: GetHospitals) => this.hospitals = res.hospitals 
    })
  }


  saveMedic() {
    //si existe acualiza
    if (this.selectedMedic) {
      //actualizar
      this.medicService.updateMedic(this.selectedMedic._id, this.medicForm.value)
          .subscribe({
            next: res => {
          
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Médico actualizado con éxito!',
                showConfirmButton: false,
                timer: 2000
              });
      
              this.router.navigateByUrl(`/dashboard/medic/${res.medic._id}`);
            }          
          });

    //si no existe crea
    } else {
      //crear
      this.medicService.createMedic(this.medicForm.value).subscribe({
        next: res => {
          
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Médico creado con éxito!',
            showConfirmButton: false,
            timer: 2000
          });
  
          this.router.navigateByUrl(`/dashboard/medics`);
        }   
      });
    }
    
  }

}
