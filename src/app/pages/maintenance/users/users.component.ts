import { Component, OnDestroy, OnInit } from '@angular/core';

import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { delay, Subscription } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public from: number = 0;
  public termSearch: string = '';
  public loading: boolean = true;

  //lista de obserbable a de-suscribirse
  public listObservers$: Array<Subscription> = [];
  


  constructor(private userService: UserService,
              private searchService: SearchsService,
              private modalImageService: ModalImageService) { }

  ngOnInit(): void {
    this.getUsers();

    const observer1$ = this.modalImageService.newImageEvent
    //agregamos un delay pq refresca antes de que el server mande la imagen
        .pipe(
          delay(200)
        )
        .subscribe({
          next: (image: any) => this.getUsers()        
        })
    
    //guardamos los observables que vamos a de-suscribir
    this.listObservers$ = [observer1$];
  }

  ngOnDestroy(): void {
    //hay que de-suscribirse de cada observer cuando se destruye el componente
    this.listObservers$.forEach(u => u.unsubscribe());
  }

  
  //METHODS:
  getUsers() {
    this.loading = true;

    this.userService.getUsers( this.from ).subscribe({
      next: ({users, total}) => {
        
        this.users = users;
        this.usersTemp = users;
        this.totalUsers = total; 
        this.loading = false;      
      }
    })
  }


  search( term: string ) {
    //preparamos el termino de busqueda para usarlo en la paginación
    this.termSearch = term;
    //si borra la busqueda vuelve a mostrar los users que estaban
    if (this.termSearch.length === 0) {
      this.users = this.usersTemp;
      return;
    }

    this.searchService.search('users', term, this.from).subscribe({
      next: (res: any) => {
        this.users = res[0];
        this.totalUsers = res[1]; 

      }
    }); 
  }


  deleteUser( user: User) {

    if (user.id === this.userService.userId) {
      Swal.fire('Error!!!', 'No puede borrarse a si mismo.', 'error');

    } else {
      Swal.fire({
        title: 'Borrar',
        text: `Deseas borrar a ${ user.name } ${ user.lastName }?`,
        showCancelButton: true,
        confirmButtonText: 'Si',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          
          this.userService.deleteUser(user).subscribe({
            
            next: res => {
              this.getUsers();
              // this.users = this.users.filter(m => m.id !== user.id);
  
              Swal.fire('Usuario borrado', `${ user.name } ${ user.lastName }`, 'success');
            },
            error: err => Swal.fire('Error!!!', 'No se pudo borrar ese usuario.', 'error'),
            
          });
        }
      });  
    } 
  }


  changeUserRole( user: User) {
    this.userService.changeUserRole(user).subscribe({
      next: res => console.log(res)
      
    })   
  }


  openModal(user: User): void {
    
    this.modalImageService.openModal('users', user.id!, user.image);
  }


  pagination( value: number): void {
    this.from += value;

    if (this.from <  0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {
      this.from -= value;
    }

    //si no hay term usara el getUsers()
    if (this.termSearch.length  === 0) {
      this.getUsers();
    } else {
      this.search(this.termSearch);
    }
    
  }

}
