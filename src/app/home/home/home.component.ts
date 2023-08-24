import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllBrands } from 'src/app/shared/models/AllBrands';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Brands!:AllBrands[]
  itemsPerSlide = 5;
  singleSlideOffset = true
  imagePath = environment.ImageUrl
  brandId!:number
 
  BrandId!:number
  constructor(private ShopService:ShopService,
            private router: Router){

  }
  ngOnInit(): void {

    this.ShopService.getAllBrands().subscribe(brandlist=>{
        this.Brands = brandlist
        console.log(brandlist)
    });
    
  }

  goToBrandProducts(id:number) {
    this.router.navigate(['Brands',id]);
  }


    
  // }
}
