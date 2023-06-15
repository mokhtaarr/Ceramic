import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { error } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        console.log("get basket is complete");
        this.calculateTotals();
      }
    })
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
        console.log("set basket is complete");
      },
      error: error => console.log("error in set basket")
    })
  }

  getCurrentBsketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product|BasketItem, quantity = 1) {
    if(this.isProduct(item)) item =  this.mapProductItemToBasketItem(item);
    const basket = this.getCurrentBsketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, item, quantity);
    this.setBasket(basket);
  }

  removeItemFromBasket(id: number, quantity = 1) {
    const basket = this.getCurrentBsketValue();
    if (!basket) return;
    const item = basket.items.find(x => x.basketItemId === id);
    if (item) {
      item.quantity -= quantity;
      if (item.quantity === 0) {
        basket.items = basket.items.filter(x => x.basketItemId !== id);
      }
      if (basket.items.length > 0) this.setBasket(basket);
      else
        this.deleteBasket(basket);
    }
  }
  
  deleteBasket(basket: Basket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.customerBasketId).subscribe({
      next: () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem("basket_Id");
      }
    })
  }


  addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const item = items.find(x => x.basketItemId === itemToAdd.basketItemId);
    if (item) item.quantity += quantity;
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }



  createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem("basket_Id", basket.customerBasketId);
    return basket;
  }

  private mapProductItemToBasketItem(item: Product) {
    return {
      basketItemId: item.itemCardId,
      productName: item.itemDescA,
      productNameAr:item.itemDescA,
      productNameEn:item.itemDescE,
      price: item.firstPrice,
      quantity: 0,
      pictureUrl: item.taxItemCode
    }
  }

  private calculateTotals() {
    const basket = this.getCurrentBsketValue();
    if (!basket) return;
    const shipping = 0;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({ shipping, total, subtotal });
  }

  private isProduct(item:Product|BasketItem) :item is Product
  {
   return (item as Product).itemDescA!==undefined
  }

}
