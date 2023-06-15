import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductBrandImagesService } from 'src/app/Services/product-brand-images.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  itemsPerSlide = 5;
  singleSlideOffset = true
  brandId!:number
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

  BrandId!:number
  constructor(private productBrandService:ProductBrandImagesService,private router: Router){

  }

  goToBrandProducts(id:number) {
    this.router.navigate(['ProductsByBrand',id]);
  }


    
  // }
}
