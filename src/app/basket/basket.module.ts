import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './basket/basket.component';
import { SharedModule } from '../shared/shared.module';
import { ProductBasketComponent } from './product-basket/product-basket.component';


@NgModule({
  declarations: [
    BasketComponent,
    ProductBasketComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    SharedModule
  ]
})
export class BasketModule { }
