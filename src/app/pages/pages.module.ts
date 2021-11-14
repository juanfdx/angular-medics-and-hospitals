import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
//components
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PagesComponent} from "./pages.component";



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
