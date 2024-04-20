import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Store Appliction';
  currentCulture!:string;
  textDir: string="rtl";
  products:any[]=[]; 
  currentLange !: string;
  notShopPage : boolean = true;

  constructor(private http:HttpClient,private translate: TranslateService,
    private basketService:BasketService,
    private accountService:AccountService,private router: Router){
    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {   
      if(translate.currentLang == 'ar')
      {
        this.textDir = 'rtl';
      }else{
        this.textDir = 'ltr';
      }
    });
  }

  ngOnInit(): void {
    // this.http.get<Pagination<Product[]>>("https://localhost:7192/api/Product").subscribe({
    //   next :response=>{
    //     this.products=response.data
    //   },
    //   error:error=>console.log(error),
    //   complete:()=>{
       
    //   }    
    // })
    const basketId= localStorage.getItem("basket_Id");
    if(basketId) this.basketService.getBasket(basketId);
    
    this.loadCurrentUser();

    this.hideCartIconOnProductDetailPage();

  
  }

  loadCurrentUser()
  {
    const token= localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe();
  }

  ngOnDestroy(){
    

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      
      this.currentCulture = event.lang;
    });
  }
  
  hideCartIconOnProductDetailPage() {
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;

      this.notShopPage = currentUrl.includes('/shop/');
    });
  }
  
}
