import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
//components
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PagesComponent} from "./pages.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { MedicsComponent } from './maintenance/medics/medics.component';
import { MedicComponent } from './maintenance/medics/medic/medic.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    MedicsComponent,
    MedicComponent,
    SearchComponent,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    PipesModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule { }
