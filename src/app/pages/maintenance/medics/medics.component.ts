import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medic } from 'src/app/models/medic.model';

import { MedicService } from 'src/app/services/medic.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: [
  ]
})
export class MedicsComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public medics: Medic[] = [];
  public medicsTemp: Medic[] = [];
  public totalMedics: number = 0;
  public from: number = 0;
  public termSearch: string = '';

  //observable a de-suscribirse
  private imageObs$!: Subscription;


  constructor(private medicService: MedicService,
              private searchService: SearchsService,
              private modalImageService: ModalImageService) { }

  ngOnInit(): void {
    this.getMedics();

    //al detectar el emit, que recarge la pagina para ver la imagen subida
    this.imageObs$ = this.modalImageService.newImageEvent
                         .pipe(delay(200))
                         .subscribe({ next: (image: any) => this.getMedics()})
  }

  ngOnDestroy(): void {
    //hay que de-suscribirse de cada observer cuando se destruye el componente
    this.imageObs$.unsubscribe();
  }


  //METHODS:
  getMedics() {
    this.loading = true;

    this.medicService.getMedics( this.from ).subscribe({
      next: res => {     
        this.medics = res.medics;
        this.medicsTemp = res.medics;
        this.totalMedics = res.total;
        this.loading = false;
      }
      
    })
  }

  
  createMedic(){

  }


  deleteMedic( medic: Medic ): void {

    Swal.fire({
      title: 'Borrar',
      text: `Deseas borrar a ${ medic.name } ${ medic.lastName }?`,
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.medicService.deleteMedic(medic._id).subscribe({

          next: res => {
            this.getMedics();
            // this.medics = this.medics.filter(m => m.id !== medic.id);

            Swal.fire('Médico borrado', `${ medic.name } ${ medic.lastName }`, 'success');
          },
          error: err => Swal.fire('Error!!!', err.error.msg, 'error'),

        });
      }
    });
  }


  openModal(medic: Medic): void {

    this.modalImageService.openModal('medics', medic._id, medic.image);
  }


  search( term: string ): void {
    this.termSearch = term;
    //si borra la búsqueda vuelve a mostrar los hospitals que estaban
    if (this.termSearch.length === 0) {
      this.getMedics();
      return;
    }

    this.searchService.search('medics', term, this.from).subscribe({
      next: (res: any) => {     
        this.medics = res.data;
        this.totalMedics = res.total;
      }
    });
  }


  pagination( value: number): void {
    this.from += value;

    if (this.from <  0) {
      this.from = 0;
    } else if (this.from >= this.totalMedics) {
      this.from -= value;
    }
    this.getMedics();
  }

}
