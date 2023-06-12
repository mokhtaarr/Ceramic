import * as cuid from 'cuid';


export interface BasketItem{
    basketItemId:number;
    productName:string;
    price:number;
    quantity:number;
    pictureUrl:string;
}

export interface Basket {
    customerBasketId:string;
    items:BasketItem[];
  
}

export class Basket implements Basket{
    customerBasketId=cuid();
    items:BasketItem[]=[];
}

export interface BasketTotals
{
    shipping:number;
    subtotal:number;
    total:number;
}