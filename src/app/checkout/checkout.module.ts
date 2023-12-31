import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CheckOutResponseComponent } from './response/check-out-response.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    CheckOutResponseComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      defaultLanguage:'ar',
      loader:{
        provide:TranslateLoader,
        useFactory : checkouthttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
  ],
  exports:[CheckOutResponseComponent]

})
export class CheckoutModule { }
export function checkouthttpLoaderFactory(http:HttpClient){
  return new  TranslateHttpLoader(http,'./assets/i18n/','.json')

} 