import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';
import { environment } from 'src/environments/environment';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';

declare function resetActiveImg(): any
declare function ready(): any

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  ProductImageUrl = environment.ProductImageUrl
  minsQuantity = false;
  product?: Product
  quantity = 1;
  quantityInBasket = 0;
  currentCulture: string='ar';

  constructor(private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private basketService: BasketService,
    private bcService: BreadcrumbService,
    private i18nservice:I18nServicesService) 
  {
    this.i18nservice.localEvent.subscribe(locale=> {this.translate.use(locale),this.currentCulture = locale} );
    
   
  }

  ngOnInit(): void { 
    this.LoadProduct();
    ready();
    resetActiveImg();
    
  }

  LoadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.shopService.getProduct(+id).subscribe({
      next: product => {
        this.product = product;
        this.bcService.set('@productDetails', product.itemDescA)
        this.basketService.basketSource$.pipe(take(1)).subscribe({
          next: basket => {
            const item = basket?.items.find(x => x.basketItemId === +id);
            if (item) {
              this.quantity = item.quantity;
              this.quantityInBasket = item.quantity;
            }
          }
        })
      },
      error: error => console.log(error)


    })
  }

  incrementQuantity() {
    this.quantity++;
    if(this.quantity > 1){
      this.minsQuantity = false
    }
  }

  decrementQuantity() {
    this.quantity--;
    if(this.quantity < 2){
      this.minsQuantity = true
    }
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

  get buttonText() {
    return this.quantityInBasket === 0 ? 'Add to basket ' : 'Update basket';
  }
}
