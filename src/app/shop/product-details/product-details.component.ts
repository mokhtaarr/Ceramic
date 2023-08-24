import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

declare function resetActiveImg() :any
declare function ready() :any

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  
  product?: Product
  quantity = 1;
  quantityInBasket = 0;

  constructor(private shopService: ShopService,
             private activatedRoute: ActivatedRoute,
             private translate: TranslateService,
             private basketService: BasketService,
             private bcService:BreadcrumbService
             ) { }
  currentCulture: string = 'ar';

  ngOnInit(): void {
    
    this.LoadProduct();
    ready();
    resetActiveImg();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });
   
   
  }

  LoadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.shopService.getProduct(+id).subscribe({
      next: product => {
        this.product = product;
        this.bcService.set('@productDetails',product.itemDescA)
        this.basketService.basketSource$.pipe(take(1)).subscribe({
          next:basket=>{
            const item= basket?.items.find(x=>x.basketItemId===+id);
            if(item){
              this.quantity=item.quantity;
              this.quantityInBasket=item.quantity;
            }
          }
        })
      },
      error: error => console.log(error)

    
    })
  }

  incrementQuantity()
  {
    this.quantity++;
  }

  decrementQuantity()
  {
    this.quantity--;
  }

  updateBasket() {
    if (this.product) {
      if (this.quantity > this.quantityInBasket) {
        const itemsToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket += itemsToAdd;
        this.basketService.addItemToBasket(this.product, itemsToAdd);
      } else {
        const itemsToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemsToRemove;
        this.basketService.removeItemFromBasket(this.product.itemCardId, itemsToRemove);
      }
    }
  }

  get buttonText()
  {
    return this.quantityInBasket===0?'Add to basket ':'Update basket';
  }
}
