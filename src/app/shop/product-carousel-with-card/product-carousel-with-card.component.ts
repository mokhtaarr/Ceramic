import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Router } from '@angular/router';
import { AllBrands } from 'src/app/shared/models/AllBrands';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-carousel-with-card',
  templateUrl: './product-carousel-with-card.component.html',
  styleUrls: ['./product-carousel-with-card.component.scss']
})
export class ProductCarouselWithCardComponent implements OnInit {

  Brands!:AllBrands[]
  imagePath = environment.ImageUrl

  constructor(private ShopService:ShopService,
    private router: Router){

  }
  ngOnInit(): void {

    this.ShopService.getAllBrands().subscribe(brandlist=>{
      this.Brands = brandlist
  });


  }

  goToBrandProducts(id:number) {
    this.router.navigate(['Brands',id]);
  }

  
}
