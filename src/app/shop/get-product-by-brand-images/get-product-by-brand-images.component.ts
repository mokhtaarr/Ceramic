import { Component, Input, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BasketService } from 'src/app/basket/basket.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-get-product-by-brand-images',
  templateUrl: './get-product-by-brand-images.component.html',
  styleUrls: ['./get-product-by-brand-images.component.scss']
})
export class GetProductByBrandImagesComponent implements OnInit {
  products: Product[] = [];
  currentCulture: string='ar';
  brandName: string = "Brands"; // يمكنك تغيير النص الجديد هنا

  constructor(private shopservice: ShopService,
              private activedRoute: ActivatedRoute,
              private translate: TranslateService,
              private basketService:BasketService,
              private bcService:BreadcrumbService) {  }
              
  ngOnInit(): void {
    let getBrandIdFromUrl: number = (this.activedRoute.snapshot.paramMap.get('BrandId')) ? Number(
      this.activedRoute.snapshot.paramMap.get('BrandId')) : 0;

    let FoundProductsBrand = this.shopservice.getProductsByBrandId(getBrandIdFromUrl)
      .subscribe((prdList) => {
        this.products = prdList
        this.brandName = "Brands"; // تغيير القيمة هنا
        this.bcService.set('@Brands', this.brandName);
      });

      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.currentCulture = event.lang;
      });
  }

}
