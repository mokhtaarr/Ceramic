import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})

export class OrderTotalsComponent implements OnInit{
  currentLange: string;



  constructor(private translate:TranslateService , 
              private i18nservice:I18nServicesService,
              public basketService:BasketService){
                this.currentLange = localStorage.getItem('currentLange') || 'ar';
                this.translate.use(this.currentLange);
              }
  
  ngOnInit(): void {
    this.i18nservice.localEvent.subscribe(locale=> this.translate.use(locale));

  }
}
