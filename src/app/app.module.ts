import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {PagesModule} from "./pages/pages.module";
import { AuthModule } from './auth/auth.module';
//components
import { AppComponent } from './app.component';
import { PageError404Component } from './page-error404/page-error404.component';

@NgModule({
  declarations: [
    AppComponent,
    PageError404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
