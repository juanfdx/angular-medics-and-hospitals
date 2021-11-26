import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-error404',
  templateUrl: './page-error404.component.html',
  styleUrls: ['./page-error404.component.css']

})
export class PageError404Component implements OnInit {

  public year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
