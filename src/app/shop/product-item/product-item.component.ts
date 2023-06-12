import { Component, Input, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product?: Product
  currentCulture: string='ar';
  textDir:string = 'rtl'

  constructor(private translate: TranslateService,private basketService:BasketService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {   
      if(translate.currentLang == 'ar')
      {
        this.currentCulture = 'ar';
        console.log("Arabic Direction")
      }else{
        this.currentCulture = 'en';
        console.log("English Direction")
      }
    });
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });
  }

  addItemToBasket() {
    this.product&& this.basketService.addItemToBasket(this.product)
    console.log('welcome')

   }

}
