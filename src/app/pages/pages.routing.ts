import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
//components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { MedicsComponent } from './maintenance/medics/medics.component';
import { MedicComponent } from './maintenance/medics/medic/medic.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [

  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
      { path: 'profile', component: ProfileComponent, data: { title: 'Profile'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account settings'} },
      { path: 'search/:term', component: SearchComponent, data: { title: 'Search'} },


      //maintenance
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals'} },
      { path: 'medics', component: MedicsComponent, data: { title: 'Medics'} },
      { path: 'medic/:id', component: MedicComponent, data: { title: 'Medic'} },
      
      //Admin routes
      { path: 'users', canActivate: [AdminGuard] , component: UsersComponent, data: { title: 'Users'} },


    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
