import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop/shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductCarouselComponent } from './product-carousel/product-carousel.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ProductCarouselWithCardComponent } from './product-carousel-with-card/product-carousel-with-card.component';
import { GetProductByBrandImagesComponent } from './get-product-by-brand-images/get-product-by-brand-images.component';
import { GetProductByCategoryImageOfferComponent } from './get-product-by-category-image-offer/get-product-by-category-image-offer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {SwiperModule} from 'swiper/angular'

@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    ProductCarouselComponent,
    ProductCarouselWithCardComponent,
    GetProductByBrandImagesComponent,
    GetProductByCategoryImageOfferComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    RouterModule,
    SharedModule,
    TranslateModule.forChild({
      defaultLanguage:'ar',
      loader:{
        provide:TranslateLoader,
        useFactory : httpTranslateLoader,
        deps:[HttpClient]
      }
    }),
    SlickCarouselModule,
    SwiperModule

    ],
  exports:[ShopComponent,GetProductByBrandImagesComponent,GetProductByCategoryImageOfferComponent]
})
export class ShopModule { }

export function httpTranslateLoader(http:HttpClient){
  return new  TranslateHttpLoader(http,'./assets/i18n/','.json')

} 
