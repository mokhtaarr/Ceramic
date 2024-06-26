import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ShopComponent } from './shop/shop/shop.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { BranchesComponent } from './home/branches/branches.component';
import { GetProductByBrandImagesComponent } from './shop/get-product-by-brand-images/get-product-by-brand-images.component';
import { GetProductByCategoryImageOfferComponent } from './shop/get-product-by-category-image-offer/get-product-by-category-image-offer.component';
import { TestComponent } from './test/test/test.component';
import { LoginComponent } from './account/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CompanyComponent } from './home/company/company.component';
import { ContactComponent } from './home/contact/contact.component';
import { MethodsComponent } from './home/methods/methods.component';
import { CheckOutResponseComponent } from './checkout/response/check-out-response.component';
import { OrdersComponent } from './checkout/orders/orders.component';
import { USerComplaintsComponent } from './core/user-complaints/user-complaints.component';
import { RequestProductComponent } from './core/request-product/request-product.component';
import { PreventGuard } from './core/guards/prevent.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'branches',component:BranchesComponent},
  {path:"Contact",component:ContactComponent},
  {path:"Payment-Methods",component:MethodsComponent},
  
  {path:'not-found',component:NotFoundComponent},
  {path:'Brands/:BrandId',component:GetProductByBrandImagesComponent},
  {path:'Categories/:CatId',component:GetProductByCategoryImageOfferComponent},
  {path:'shop',loadChildren:()=>import('./shop/shop.module').then(m=>m.ShopModule)},
  {path:'basket',loadChildren:()=>import('./basket/basket.module').then(m=>m.BasketModule)},
  // {path:'shop/:id',component:ProductDetailsComponent},
  {
    path: 'account',
    canActivate:[PreventGuard],
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},



  {
    path: 'checkout',
    canActivate:[AuthGuard],
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)
  },


  {path:'test',component:TestComponent},
  {path:'logo',component:LoginComponent},
  {path:'Company',component:CompanyComponent},
  {path:'CheckOutResponse',component:CheckOutResponseComponent},
  {path:'orders',component:OrdersComponent},
  {path:'complain',component:USerComplaintsComponent},
  {path:'ProductRequest',component:RequestProductComponent},





  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
