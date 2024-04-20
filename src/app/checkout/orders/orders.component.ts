import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { OrderDataDto } from 'src/app/shared/models/orderDataDto';
import { AccountService } from 'src/app/account/account.service';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit   {

  UserOrdersData : OrderDataDto[] = []
  Useremail !: string;
  currentLange!:string;
  currentCulture: string;

constructor(public checkoutService:CheckoutService , 
  private accountService:AccountService , public toastr : ToastrService,
   private route: ActivatedRoute,private i18nservice:I18nServicesService,private translate: TranslateService,)
   
   {

    this.currentLange = localStorage.getItem('currentLange') || 'ar';
    this.translate.use(this.currentLange);
    this.currentCulture = this.translate.currentLang;
     
  }
 
 

  ngOnInit(): void {
    this.i18nservice.localEvent.subscribe(locale=> this.translate.use(locale));
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });
    
    this.getOrderData()
  }

  getOrderData(){
    this.accountService.currentUser$.subscribe(user=>{
      this.Useremail = user!.email,

      this.checkoutService.GetUserOrders(this!.Useremail).subscribe({
        next:(data : OrderDataDto[]) =>{
          this.UserOrdersData = data
        },
        error: error=> {
          this.toastr.error("حدث خطا اثناء جلب بيانات الطلب")
        }   
      })
    })

   
  }

}
