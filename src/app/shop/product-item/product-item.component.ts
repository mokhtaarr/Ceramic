import { Component, Input, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product ?: Product  
  @Input() productCart!: Product
  addButton : boolean = false;
  amount:number = 0;
  ProductImageUrl = environment.ProductImageUrl
  currentCulture: string='ar';
  textDir:string = 'rtl'
  cardProduct:any[]=[]
  favouritelist : any[]=[]
  

  constructor(private translate: TranslateService,private basketService:BasketService,public toastr : ToastrService) {
   this.currentCulture = this.translate.currentLang;
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });

    if (this.product) {
      this.url = this.ProductImageUrl+this.product.taxItemCode; // تعيين الصورة الرئيسية عند بدء التحميل
    }
  }

  addItemToBasket() {
    this.product&& this.basketService.addItemToBasket(this.product)
   }

   url: string = "../../../assets/images/prd.jpg";
   imageChange(event: any){
       this.url = event.target.src;
   }

   addToFavorite(){

    if("favouriteItems" in localStorage){
      this.favouritelist = JSON.parse(localStorage.getItem("favouriteItems")!)
      let exist = this.favouritelist.find(prd=>prd.itemCardId == this.product?.itemCardId)

      if(exist){
        if(this.currentCulture === "ar"){
          alert("المنتج موجود بالفعل في المفضلة لديك")
        }

        if(this.currentCulture === 'en'){
          alert("The product is already in your favourites")
        }
      }else{
        this.favouritelist.push(this.product)
        localStorage.setItem("favouriteItems",JSON.stringify(this.favouritelist))
        if(this.currentCulture === "ar"){
          alert("تم أضافة المنتج الى المفضلة")
        }

        if(this.currentCulture === 'en'){
          alert("The product has been added to your favorites")
        }
      }

    }else
    {
      this.favouritelist.push(this.product)
      localStorage.setItem("favouriteItems",JSON.stringify(this.favouritelist))
      if(this.currentCulture === "ar"){
        alert("تم أضافة المنتج الى المفضلة")
      }

      if(this.currentCulture === 'en'){
        alert("The product has been added to your favorites")
      }
    }
   }

}
