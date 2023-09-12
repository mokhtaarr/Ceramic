import { Component, Input, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
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
  

  constructor(private translate: TranslateService,private basketService:BasketService) {
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
}
