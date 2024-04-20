import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';
import { environment } from 'src/environments/environment.prod';
import { Observable, map} from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  currentCulture!: string;
  currentLange!:string;
  cardProducts: any[] =[];
  baseUrl = environment.apiUrl
  DiscountAr : string = ""
  DiscountEn : string = ""


  constructor(public translate:TranslateService,
    public basketService:BasketService,
    private i18nservice:I18nServicesService,
    public accountService:AccountService,
    private http : HttpClient){
    // this.currentCulture = 'en';
    this.currentLange = localStorage.getItem('currentLange') || 'ar';
    this.translate.use(this.currentLange);


  }
  
  ngOnInit(): void {
    this.getCartProduct()

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    }); 

    this.getDiscount().subscribe()
 }

 getCount(items:BasketItem[])
 {
   return items.reduce((sum,item)=>sum+item.quantity,0)
 }

 changeCurrentLanguage(lang:string){
  this.translate.use(lang);
  localStorage.setItem('currentLange',lang);
  this.i18nservice.changeLocale(lang);
}

getCartProduct(){
  if("cart" in localStorage){
    this.cardProducts = JSON.parse(localStorage.getItem("cart")!)
  
}
}


getDiscount() : Observable<any>{
  return this.http.get(this.baseUrl +'Discount').pipe(
    map((discount : any) =>{
      this.DiscountAr = discount.name1;
      this.DiscountEn = discount.name2;
    })
  )
}
}
