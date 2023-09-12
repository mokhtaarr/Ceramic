import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/product';
import { Query } from '@angular/core';
import swiperCore,{Navigation,Pagination,EffectCoverflow} from 'swiper';
swiperCore.use([Navigation,Pagination,EffectCoverflow]); 

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ProductCarouselComponent implements OnInit {
  itemsPerSlide =3;
  singleSlideOffset = true;
  slidesProduct: any[] = [];


  constructor(private shopService: ShopService){

  }
  ngOnInit(): void {
    this.shopService.getProductsWithOffer().subscribe(prdList=>{
      this.slidesProduct = prdList;
    });
  }
  slides = [
    {img: "../../../assets/images/brand1.jpg"},
    {img: "../../../assets/images/brand2.jpg"},
    {img: "../../../assets/images/brand4.jpg"},
    {img: "../../../assets/images/brand5.jpg"},
    {img: "../../../assets/images/brand6.jpg"},
    {img: "../../../assets/images/brand7.jpg"},
    {img: "../../../assets/images/brand8.jpg"},
    {img: "../../../assets/images/brand9.jpg"},
    {img: "../../../assets/images/brand10.jpg"}

   
  ];

  slideConfig = {
    "slidesToShow": 4,
     "slidesToScroll": 5,
    //  "autoplay":true,
    //  "autoplaySpeed":5000,
    //  "pauseOnHover":true,
    //  "infinite":true,
    //  "responsive":[
    //   {
    //     "breakpoint":992,
    //     "settings":{
    //       "arrows":true,
    //       "infinite":true,
    //       "slidesToShow":3,
    //       "slidesToScroll":3,
    //     }
    //   },
    //   {
    //     "breakpoint":768,
    //     "settings":{
    //       "arrows":true,
    //       "infinite":true,
    //       "slidesToShow":1,
    //       "slidesToScroll":1,
    //     }
    //   }
    //  ]
    };

 
  
  

}

