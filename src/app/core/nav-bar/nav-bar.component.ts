import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  // currentCulture: string;
  currentLange!:string;
  constructor(public translate:TranslateService,public basketService:BasketService,private i18nservice:I18nServicesService){
    // this.currentCulture = 'en';
    this.currentLange = localStorage.getItem('currentLange') || 'ar';
    this.translate.use(this.currentLange);
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
//   ngOnInit(): void {
//     this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
//       this.currentCulture = event.lang;
//     }); 
//  }

 getCount(items:BasketItem[])
 {
   return items.reduce((sum,item)=>sum+item.quantity,0)
 }

 changeCurrentLanguage(lang:string){
  this.translate.use(lang);
  localStorage.setItem('currentLange',lang);
  this.i18nservice.changeLocale(lang);
}

}
