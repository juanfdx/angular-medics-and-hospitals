import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { Subscription, delay } from 'rxjs';

import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';



@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public totalHospitals: number = 0;
  public from: number = 0;
  public termSearch: string = '';


    //lista de observable a de-suscribirse
    public listObservers$: Array<Subscription> = [];


  constructor(private hospitalService: HospitalService,
              private searchService: SearchsService,
              private modalImageService: ModalImageService) { }

  ngOnInit(): void {
    this.getHospitals();

    //al detectar el emit que recarge la pagina para ver la imagen subida
    const observer1$ = this.modalImageService.newImageEvent
    //agregamos un delay pq refresca antes de que el server mande la imagen
        .pipe(
          delay(200)
        )
        .subscribe({
          next: (image: any) => this.getHospitals()
        })

    //guardamos los observables que vamos a de-suscribir
    this.listObservers$ = [observer1$];
  }

  ngOnDestroy(): void {
    //hay que de-suscribirse de cada observer cuando se destruye el componente
    this.listObservers$.forEach(u => u.unsubscribe());
  }


  //METHODS:
  getHospitals() {
    this.loading = true;

    this.hospitalService.getHospitals( this.from ).subscribe({
      next: res => {
        this.hospitals = res.hospitals;
        this.hospitalsTemp = res.hospitals;
        this.totalHospitals = res.total;
        this.loading = false;
      }
      
    })
  }


  //usamos un sweetalert para crear un hospital
  async createHospital() {
    
    const { value } = await Swal.fire<string>({
      input: 'text',
      title: 'Enter hospital name:',
      inputPlaceholder: 'Hospital name...',
      showCancelButton: true,
    })
    
    if (value !== undefined) {    
      if (value.trim().length > 0) {
        this.hospitalService.createHospital(value!).subscribe({
          next: res => {
            
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Hospital creado con éxito!',
              showConfirmButton: false,
              timer: 2000
            }),
            this.getHospitals()
          },
  
          error: err => Swal.fire('Error!!!', 'No se pudo crear el hospital.', 'error') 
          
        })
      }  
    }

  }


  updateHospital(hospital: Hospital): void {
    this.hospitalService.updateHospital(hospital._id, hospital.name).subscribe({

      next: res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Hospital actualizado con éxito!',
          showConfirmButton: false,
          timer: 2000
        })
      },
          
      error: err => Swal.fire('Error!!!', 'No se pudo actualizar el hospital.', 'error')      
    });  
  }


  deleteHospital(hospital: Hospital): void {

    Swal.fire({
      title: 'Borrar',
      text: `Deseas borrar a ${ hospital.name }?`,
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.hospitalService.deleteHospital(hospital._id).subscribe({

          next: res => {
            
            this.getHospitals();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Hospital borrado con éxito!',
              showConfirmButton: false,
              timer: 2000
            })
          },
              
          error: err => Swal.fire('Error!!!', 'No se pudo borrar el hospital.', 'error') 
        });
      }
    });
  }


  openModal(hospital: Hospital) {

    this.modalImageService.openModal('hospitals', hospital._id, hospital.image);
  }


  search( term: string ) {
    this.termSearch = term;
    //si borra la búsqueda vuelve a mostrar los hospitals que estaban
    if (this.termSearch.length === 0) {
      this.getHospitals();
      return;
    }

    this.searchService.search('hospitals', term, this.from).subscribe({
      next: (res: any) => {
        
        this.hospitals = res.data;
        this.totalHospitals = res.total;

      }
    });
  }


  pagination( value: number): void {
    this.from += value;

    if (this.from <  0) {
      this.from = 0;
    } else if (this.from >= this.totalHospitals) {
      this.from -= value;
    }
    this.getHospitals();
  }

}
