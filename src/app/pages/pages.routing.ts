import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
//components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsersComponent } from './maintenance/users/users.component';


const routes: Routes = [

  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
      { path: 'profile', component: ProfileComponent, data: { title: 'Profile'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account settings'} },

      //maintenance
      { path: 'users', component: UsersComponent, data: { title: 'Users'} },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
