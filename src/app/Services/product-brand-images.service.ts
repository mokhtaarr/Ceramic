import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductBrandImagesService {
  product !: Product[]

  constructor() { }

  
}
