import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ShopComponent } from './shop/shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { BranchesComponent } from './home/branches/branches.component';
import { GetProductByBrandImagesComponent } from './shop/get-product-by-brand-images/get-product-by-brand-images.component';
import { GetProductByCategoryImageOfferComponent } from './shop/get-product-by-category-image-offer/get-product-by-category-image-offer.component';
import { TestComponent } from './test/test/test.component';
import { LoginComponent } from './account/login/login.component';

const routes: Routes = [
  {path:'',component:ShopComponent},
  {path:'home',component:HomeComponent},
  {path:'branches',component:BranchesComponent},
  {path:'test-error',component:TestErrorComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'server-error',component:ServerErrorComponent},
  {path:'ProductsByBrand/:BrandId',component:GetProductByBrandImagesComponent},
  {path:'ProductsByCategory/:CatId',component:GetProductByCategoryImageOfferComponent},
  {path:'shop',loadChildren:()=>import('./shop/shop.module').then(m=>m.ShopModule)},
  {path:'basket',loadChildren:()=>import('./basket/basket.module').then(m=>m.BasketModule)},
  // {path:'shop/:id',component:ProductDetailsComponent},
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)},
  {path:'test',component:TestComponent},
  {path:'logo',component:LoginComponent},




  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
