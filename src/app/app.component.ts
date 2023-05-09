import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Store Appliction';
  currentCulture!:string;
  textDir!: string;
  products:any[]=[]; 

  constructor(private http:HttpClient,private translate: TranslateService){
    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {   
      if(translate.currentLang == 'ar')
      {
        this.textDir = 'ltr';
        console.log("Arabic Direction")
      }else{
        this.textDir = 'rtl';
        console.log("English Direction")
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
  }

  ngOnDestroy(){
    

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      
      this.currentCulture = event.lang;
    });
  }
 
}
