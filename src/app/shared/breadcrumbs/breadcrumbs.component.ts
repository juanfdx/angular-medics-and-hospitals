import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public title: string = '';
  public titleSubs$!: Subscription;


  constructor(private router: Router) { 
    this.titleSubs$ = this.getDataRoutes().subscribe( ({ title }) => {
     
        this.title = title;
        //titulo de la pagina
        document.title = `Medics & Hospitals - ${ title }`;
      
    });
  }
  
  ngOnInit(): void {
  }


  ngOnDestroy(): void {   
    this.titleSubs$.unsubscribe();
  }

  //Methods:
  getDataRoutes(): Observable<any> {
    //obtenemos la propiedad data de las rutas para los breadcrumbs
    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd ),
        filter( (event: any) => event.snapshot.firstChild === null ),
        map((event: any) => event.snapshot.data )
      );

  }
}
