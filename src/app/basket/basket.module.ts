import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './basket/basket.component';
import { SharedModule } from '../shared/shared.module';
import { ProductBasketComponent } from './product-basket/product-basket.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { SharedBasketComponent } from './shared-basket/shared-basket.component';


@NgModule({
  declarations: [
    BasketComponent,
    ProductBasketComponent,
    SharedBasketComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      defaultLanguage:'ar',
      loader:{
        provide:TranslateLoader,
        useFactory : httpTranslateLoader,
        deps:[HttpClient]
      }
    }),
  ], exports:[SharedBasketComponent]
})
export class BasketModule { }
export function httpTranslateLoader(http:HttpClient){
  return new  TranslateHttpLoader(http,'./assets/i18n/','.json')

} 