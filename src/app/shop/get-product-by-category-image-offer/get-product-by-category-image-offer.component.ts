import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-get-product-by-category-image-offer',
  templateUrl: './get-product-by-category-image-offer.component.html',
  styleUrls: ['./get-product-by-category-image-offer.component.scss']
})
export class GetProductByCategoryImageOfferComponent implements OnInit {
  products: Product[] = [];
  currentCulture: string='ar';
  
  constructor(private shopservice: ShopService,
    private activedRoute: ActivatedRoute, private translate: TranslateService) {

  }
  
  ngOnInit(): void {
    let getCategoryFromUrl: number = (this.activedRoute.snapshot.paramMap.get('CatId')) ? Number(
      this.activedRoute.snapshot.paramMap.get('CatId')) : 0;

   this.shopservice.getProductsByCategoryId(getCategoryFromUrl)
      .subscribe((prdList) => {
        this.products = prdList
      });

      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.currentCulture = event.lang;
      });
  }
}
