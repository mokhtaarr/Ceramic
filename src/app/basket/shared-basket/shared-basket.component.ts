import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { BasketItem } from 'src/app/shared/models/basket';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shared-basket',
  templateUrl: './shared-basket.component.html',
  styleUrls: ['./shared-basket.component.scss']
})

export class SharedBasketComponent implements OnInit {
  currentLange!:string;
  currentCulture: string;
  ProductImageUrl = environment.ProductImageUrl

  constructor(public basketService:BasketService,
              private translate:TranslateService , 
              private i18nservice:I18nServicesService,)
              {
                this.currentLange = localStorage.getItem('currentLange') || 'ar';
                this.translate.use(this.currentLange);
                this.currentCulture = 'ar'
             }
  ngOnInit(): void {
    this.i18nservice.localEvent.subscribe(locale=> this.translate.use(locale));
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });
  }

  incrementQuantity(item:BasketItem)
  {
    this.basketService.addItemToBasket(item);
  }

  removeItem(id:number,quantity:number)
  {
    this.basketService.removeItemFromBasket(id,quantity);
  }
}
