import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//components
import { ModalImageComponent } from './modal-image/modal-image.component';
// import ngx-translate and the http loader
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';



@NgModule({
  declarations: [
    ModalImageComponent
  ],
  exports: [
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
        defaultLanguage: 'es',
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ]
})
export class ComponentsModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}