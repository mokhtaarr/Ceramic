import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';
import { AllBrands } from 'src/app/shared/models/AllBrands';
import { AllCategory } from 'src/app/shared/models/AllCategory';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Brands!:AllBrands[]
  itemsPerSlide = 3;
  singleSlideOffset = true
  imagePath = environment.ImageUrl
  brandId!:number
  BrandId!:number
  Categories !: AllCategory[];
  currentLange!:string;
  currentCulture!: string;
  constructor(private ShopService:ShopService,
            private router: Router,private translate: TranslateService,
            private i18nservice:I18nServicesService)
            {
              
              this.currentCulture = this.translate.currentLang;

            }
  ngOnInit(): void {

    // this.i18nservice.localEvent.subscribe(local=>
    //   this.currentCulture = local
    //   );
    //   console.log("local is" ,this.currentCulture)
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;

    });

    this.ShopService.getAllBrands().subscribe(brandlist=>{
        this.Brands = brandlist
    });

  

    // this.currentCulture = localStorage.getItem('currentLang');

    this.ShopService.getAllCategories().subscribe(catList=>{
      this.Categories = catList
  });

  // const storedLanguage = localStorage.getItem('currentLange');

  // if (storedLanguage) {
  //   this.currentCulture = storedLanguage
  // } else {
  //   this.currentCulture = 'ar';
  // }


  }

  goToBrandProducts(id:number) {
    this.router.navigate(['Brands',id]);
  }

  goToCategoryProduct(id: number) {
    this.router.navigate(['Categories', id])
  }
    
  slides = [
    {image: 'assets/images/brand1.jpg'},
    {image: 'assets/images/brand2.jpg'},
    {image: 'assets/images/brand3.jpg'},
    {image: 'assets/images/brand4.jpg'},
    {image: 'assets/images/brand5.jpg'},
    {image: 'assets/images/brand6.jpg'},
   
   
  ];
}
