import { Component } from '@angular/core';
import { BasketService } from '../basket.service';
import { BasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-shared-basket',
  templateUrl: './shared-basket.component.html',
  styleUrls: ['./shared-basket.component.scss']
})
export class SharedBasketComponent {

  constructor(public basketService:BasketService){
    
  }

  incrementQuantity(item:BasketItem)
  {
    this.basketService.addItemToBasket(item);
  }

  removeItem(id:number,quantity:number)
  {
    this.basketService.removeItemFromBasket(id,quantity);
  }
}
