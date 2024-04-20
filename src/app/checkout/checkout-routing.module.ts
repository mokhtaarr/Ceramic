import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckOutResponseComponent } from './response/check-out-response.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path:'',component:CheckoutComponent},
  {path:'checkOut-Response',component:CheckOutResponseComponent},
  {path:'orders',component:OrdersComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
