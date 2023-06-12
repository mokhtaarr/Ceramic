import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  currentCulture: string;

  constructor(public translate:TranslateService,public basketService:BasketService){
    this.currentCulture = 'en';

  }
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    }); 
 }

 getCount(items:BasketItem[])
 {
   return items.reduce((sum,item)=>sum+item.quantity,0)
 }

}
