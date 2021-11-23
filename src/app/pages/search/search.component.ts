import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchsService } from 'src/app/services/searchs.service';

import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from 'src/app/models/medic.model';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public medics: Medic[] = [];
  public hospitals: Hospital[] = [];


  constructor(private activatedRoute: ActivatedRoute,
              private searchService: SearchsService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe({
      next: ({ term }) => this.globalSearch( term )
      
    })
  }


  //METHODS:
  globalSearch( term: string ): void {
    this.searchService.globalSearch( term ).subscribe({
      next: res => {
        this.users     = res.users;
        this.medics    = res.medics;
        this.hospitals = res.hospitals;
      }
      
    })
  }


}
