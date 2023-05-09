import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/product';
import { error } from 'jquery';
import { Brand } from 'src/app/shared/models/brands';
import { Type } from 'src/app/shared/models/types';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { shopParams } from 'src/app/shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search')searchTerms?:ElementRef;
  currentCulture: string;
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  shopParams = new shopParams();
  TotalCount = 0;
  sortOptions = [
    { nameAr: 'السعر: عشوائى', nameEn: 'Alphabetical', value: 'name' },
    { nameAr: 'السعر: من الادنى الى الاعلى', nameEn: 'Price: Low to high', value: 'priceAsc' },
    { nameAr: 'السعر: من الاعلى الى الادنى', nameEn: 'Price: High to low', value: 'priceDesc' },
  ];
  constructor(private shopService: ShopService, private translate: TranslateService) {
    this.currentCulture = 'ar'
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.TotalCount =response.count;
      },
      error: error => console.log(error)
    })
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{ brandId: 0, descA: 'كل الماركات', descE: 'All' }, ...response],
      error: error => console.log(error)
    })
  }
  getTypes() {
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{ itemCategoryId: 0, itemCatDescA: 'كل الاصناف', itemCatDescE: 'All' }, ...response],
      error: error => console.log(error)
    })
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }
  onSortSelected(event: any) {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }
  onPageChanged(event:any){
    if(this.shopParams.pageNumber!==event.page)
    {
      this.shopParams.pageNumber= event.page;
      this.getProducts();
    }
  }
  onSrarch(){
    this.shopParams.search = this.searchTerms?.nativeElement.value;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }
  OnReset(){
    if(this.searchTerms)this.searchTerms.nativeElement.value ="";
    this.shopParams = new shopParams();
    this.getProducts();
  }

}
