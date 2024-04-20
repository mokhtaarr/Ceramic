import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FavouriteItemsComponent } from './favourite-items/favourite-items.component';

const routes: Routes = [
  {path:'',component:ShopComponent},
  {path:'favourite',component:FavouriteItemsComponent},
  {path:':id',component:ProductDetailsComponent,data: {breadcrumb: {alias: 'productDetails'}}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
