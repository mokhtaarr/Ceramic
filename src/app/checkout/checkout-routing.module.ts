import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckOutResponseComponent } from './check-out-response/check-out-response.component';

const routes: Routes = [
  {path:'',component:CheckoutComponent},
  {path:'checkOut-Response',component:CheckOutResponseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
