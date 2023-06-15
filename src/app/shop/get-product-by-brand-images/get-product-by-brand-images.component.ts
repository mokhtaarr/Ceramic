import { Component, Input, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-get-product-by-brand-images',
  templateUrl: './get-product-by-brand-images.component.html',
  styleUrls: ['./get-product-by-brand-images.component.scss']
})
export class GetProductByBrandImagesComponent implements OnInit {
  products: Product[] = [];
  currentCulture: string='ar';
  
  constructor(private shopservice: ShopService,
    private activedRoute: ActivatedRoute, private translate: TranslateService,private basketService:BasketService) {

  }
  ngOnInit(): void {
    let getBrandIdFromUrl: number = (this.activedRoute.snapshot.paramMap.get('BrandId')) ? Number(
      this.activedRoute.snapshot.paramMap.get('BrandId')) : 0;
    console.log(getBrandIdFromUrl);

    let FoundProductsBrand = this.shopservice.getProductsByBrandId(getBrandIdFromUrl)
      .subscribe((prdList) => {
        this.products = prdList
      });

      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.currentCulture = event.lang;
      });
  }

  // addItemToBasket() {
  //    this.basketService.addItemToBasket()
  //   console.log('welcome')

  //  }
}
