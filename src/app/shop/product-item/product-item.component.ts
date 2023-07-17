import { Component, Input, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/models/product';
import Swal from 'sweetalert2';

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
  
  currentCulture: string='ar';
  textDir:string = 'rtl'
  cardProduct:any[]=[]
  

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
   AddToCard(){
    if("cart" in localStorage){
      this.cardProduct = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cardProduct.find(item=>item.item.itemCardId == this.productCart?.itemCardId)
      if(exist){
        Swal.fire('هذا المنتج موجود بالفعل في السله')
      }else{
        this.cardProduct.push({item: this.productCart, quantity:this.amount})
        localStorage.setItem("cart",JSON.stringify(this.cardProduct)) 
        Swal.fire("شكرا لك ...",'تم اضافه المنتج بنجاح الي السله','success')
      }
       }else{
        this.cardProduct.push({item: this.productCart, quantity:this.amount})
        localStorage.setItem("cart",JSON.stringify(this.cardProduct))
        Swal.fire("شكرا لك ...",'تم اضافه المنتج بنجاح الي السله','success')

    }
  }
}
