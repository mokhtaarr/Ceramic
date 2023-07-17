import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { ProductBasketComponent } from './product-basket/product-basket.component';

const routes: Routes = [
  {path:'',component:BasketComponent},
  {path:'productBasket',component:ProductBasketComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketRoutingModule { }
