import { Component } from '@angular/core';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent {
  itemsPerSlide = 5;
  singleSlideOffset = true

  slides = [
    {image: 'assets/images/brand1.jpg',title:'img1'},
    {image: 'assets/images/brand2.jpg',title:'img2'},
    {image: 'assets/images/brand3.jpg' ,title:'img3'},
    {image: 'assets/images/brand4.jpg',title:'img4'},
    {image: 'assets/images/brand5.jpg',title:'img5'},
    {image: 'assets/images/brand6.jpg',title:'img6'},
    {image: 'assets/images/brand7.jpg',title:'img7'},
    {image: 'assets/images/brand8.jpg',title:'img8'},
    {image: 'assets/images/brand9.jpg',title:'img9'},
    {image: 'assets/images/brand10.jpg',title:'img10'}
  ]

  
  slidesProduct = [
    {image: 'assets/images/brandp1.jpg',title:'img1',desc:"20*80 سيراميك حوائط الملكه شاتو بلاك جراى"},
    {image: 'assets/images/brandp1.jpg',title:'img1',desc:"60*60 سيراميك ارضيات الجوهرة شاتو دارك جراى"},
    {image: 'assets/images/brandp3.jpg',title:'img1',desc:"10*90 سيراميك ارضيات بروسلين شاتو اصفر جراى"},
    {image: 'assets/images/brandp4.jpg',title:'img1',desc:"30*30 سيراميك ارضيات الجوهرة شاتو رمادي جراى"},
    {image: 'assets/images/brandp5.jpg',title:'img1',desc:"20*20 سيراميك ارضيات الجوهرة شاتو دارك جراى"},
    {image: 'assets/images/brandp6.jpg',title:'img1',desc:"20*20 سيراميك ارضيات الجوهرة شاتو دارك جراى"},
    {image: 'assets/images/brandp7.jpg',title:'img1',desc:"10160 سيراميك ارضيات الجوهرة شاتو دارك جراى"},

  ]
}

