import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/product';
import { error } from 'jquery';
import { Brand } from 'src/app/shared/models/brands';
import { Type } from 'src/app/shared/models/types';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { shopParams } from 'src/app/shared/models/shopParams';
import { Router } from '@angular/router';
import { AllCategory } from 'src/app/shared/models/AllCategory';
import { environment } from 'src/environments/environment';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerms?: ElementRef;
  currentCulture: string;
  products: Product[] = [];
  brands: Brand[] = [];
  Categories !: AllCategory[];
  types: Type[] = [];
  imagePath = environment.ImageUrl
  shopParams = new shopParams();
  TotalCount = 0;
  sortOptions = [
    { nameAr: 'السعر: عشوائى', nameEn: 'Alphabetical', value: 'name' },
    { nameAr: 'السعر: من الادنى الى الاعلى', nameEn: 'Price: Low to high', value: 'priceAsc' },
    { nameAr: 'السعر: من الاعلى الى الادنى', nameEn: 'Price: High to low', value: 'priceDesc' },
  ];

  itemsPerSlide = 5;
  singleSlideOffset = true
  cardProducts: any[]=[];
  initialProductList = [];
  initialProductListEn = [];
  productList : any[] = [];

  currentLange!:string;

  // productList = [
  //   { productName: 'دلايه' },
  //   { productName: 'سيراميك' },
  //   { productName: 'مو مو سيراميك' },
  //   { productName: 'حمام' },
  //   { productName: 'رخام' },
  //    ];

    selectedProduct: any;
    showDropdown: boolean = false;
    showDropdownEn: boolean = false;
    filteredProducts: any[] = [];
    filteredProductsEn: any[] = [];
  

  constructor(private shopService: ShopService, private translate: TranslateService,
    private router: Router,private i18nservice:I18nServicesService) {
      
      this.currentLange = localStorage.getItem('currentLange') || 'ar';
      this.translate.use(this.currentLange);
      this.currentCulture = this.translate.currentLang;

    this.shopService.getAllProductNameAr().subscribe({
      next: (res : any[])=> {
        this.productList = res
      },
  
      error : error => console.log(error)
    }
    );
  
  }

  ngOnInit(): void {

    this.i18nservice.localEvent.subscribe(locale=> this.translate.use(locale));
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });
    this.getProducts();
    this.getBrands();
    this.getTypes();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });
    this.getCartProduct();

    this.shopService.getAllCategories().subscribe(catList=>{
      this.Categories = catList
  });
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.TotalCount = response.count;
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
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onSortSelected(event: any) {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }
  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event.page) {
      this.shopParams.pageNumber = event.page;
      this.getProducts();
    }
  }

  onSearchInputChange() {
    const searchTerm = this.selectedProduct?.productName.toLowerCase();

    this.filteredProducts = this.productList.filter(product => {
      return product.productName.toLowerCase().indexOf(searchTerm) > -1;
    });


    this.filteredProductsEn = this.productList.filter(product => {
      return product.productNameEn.toLowerCase().indexOf(searchTerm) > -1;
    });

    // إظهار/إخفاء القائمة حسب وجود نص في حقل البحث
    this.showDropdown = searchTerm.length > 0 && this.filteredProducts.length > 0;
    this.showDropdownEn = searchTerm.length > 0 && this.filteredProductsEn.length > 0;
  }

  selectProduct(product: any) {
    this.selectedProduct = product;
    this.showDropdown = false;
    this.showDropdownEn = false;
  }

  onKeyUp(event: KeyboardEvent) {
    // Check if the pressed key is not 'Enter'
    if (event.key !== 'Enter') {

      const searchTerm = this.searchTerms?.nativeElement.value;

     
   this.filteredProducts = this.productList.filter(product =>
      product.productName.toLowerCase().includes(searchTerm)
    );

    this.filteredProductsEn = this.productList.filter(product =>
      product.productNameEn.toLowerCase().includes(searchTerm)
    );
  
    if(this.filteredProducts.length > 0)
      this.showDropdown = searchTerm && searchTerm.trim() !== '';

      if(this.filteredProductsEn.length > 0)
      this.showDropdownEn = searchTerm && searchTerm.trim() !== '';
    }
  }

  // onKeyUp(event: KeyboardEvent) {
  //   // Check if the pressed key is not 'Enter'
  //   if (event.key !== 'Enter') {
  //     const searchTerm = this.searchTerms?.nativeElement.value.toLowerCase().trim();
  
  //     // تصفية productList باستخدام الحرف المدخل في حقل البحث
  //     this.productList = this.productList.filter(product =>
  //       product.productName.toLowerCase().includes(searchTerm)
  //     );
  
  //     this.showDropdown = this.productList.length > 0;
  //   }
  // }
  

  onSrarch() {
    this.shopParams.search = this.searchTerms?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  OnReset() {
    if (this.searchTerms) this.searchTerms.nativeElement.value = "";
    this.shopParams = new shopParams();
    this.selectedProduct = null;
    this.showDropdown = false;
    this.filteredProducts = [];
    this.getProducts();
  }

  goToCategoryProduct(id: number) {
    this.router.navigate(['Categories', id])
  }

  getCartProduct() {
    if ("cart" in localStorage) {
      this.cardProducts = JSON.parse(localStorage.getItem("cart")!)
    }
  }

  slidesProduct = [
    { image: 'assets/images/brandp1.jpg', title: 'img1', desc: "20*80 سيراميك حوائط الملكه شاتو بلاك جراى" },
    { image: 'assets/images/brandp1.jpg', title: 'img1', desc: "60*60 سيراميك ارضيات الجوهرة شاتو دارك جراى" },
    { image: 'assets/images/brandp3.jpg', title: 'img1', desc: "10*90 سيراميك ارضيات بروسلين شاتو اصفر جراى" },
    { image: 'assets/images/brandp4.jpg', title: 'img1', desc: "30*30 سيراميك ارضيات الجوهرة شاتو رمادي جراى" },
    { image: 'assets/images/brandp5.jpg', title: 'img1', desc: "20*20 سيراميك ارضيات الجوهرة شاتو دارك جراى" },
    { image: 'assets/images/brandp6.jpg', title: 'img1', desc: "20*20 سيراميك ارضيات الجوهرة شاتو دارك جراى" },
    { image: 'assets/images/brandp7.jpg', title: 'img1', desc: "10160 سيراميك ارضيات الجوهرة شاتو دارك جراى" },

  ]
}
