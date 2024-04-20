import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { BasketItem } from 'src/app/shared/models/basket';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from 'src/app/account/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit  {
  currentLange!:string;
  currentCulture: string;
  city : string|undefined
  ProductImageUrl = environment.ProductImageUrl


  constructor(public basketService:BasketService,
             private translate:TranslateService , 
             private i18nservice:I18nServicesService,
             private http:HttpClient,
             public accountService:AccountService){
      this.currentLange = localStorage.getItem('currentLange') || 'ar';
      this.translate.use(this.currentLange);
      this.currentCulture = this.translate.currentLang;
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
