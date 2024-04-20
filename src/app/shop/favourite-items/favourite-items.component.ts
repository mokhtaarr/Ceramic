import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-favourite-items',
  templateUrl: './favourite-items.component.html',
  styleUrls: ['./favourite-items.component.scss']
})
export class FavouriteItemsComponent implements OnInit {
  products: Product[] = [];


  constructor(){

  }
  ngOnInit(): void {
    this.getFavouriteProducts()
  }

  getFavouriteProducts(){
    if("favouriteItems" in localStorage){
      this.products = JSON.parse(localStorage.getItem("favouriteItems")!)
    }
  }
}
