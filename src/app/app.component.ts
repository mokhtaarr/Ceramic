import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';
import { BasketService } from './basket/basket.service';

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

  constructor(private http:HttpClient,private translate: TranslateService,private basketService:BasketService){
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

    this.http.get<Pagination<Product[]>>("https://localhost:7192/api/Product").subscribe({
      next :response=>{
        console.log(response)
        this.products=response.data
      },
      error:error=>console.log(error),
      complete:()=>{
        console.log("request Complete")
        console.log("extraStament")
      }    
    })
    const basketId= localStorage.getItem("basket_Id");
    if(basketId) this.basketService.getBasket(basketId);
    // this.loadCurrentUser();
  
  }

  ngOnDestroy(){
    

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      
      this.currentCulture = event.lang;
    });
  }
  
  
}
