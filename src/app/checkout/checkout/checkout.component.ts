import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  currentLange!:string;
  currentCulture: string;
  firstName:string|undefined|null
  LastName!:string|undefined|null
  street!:String|undefined|null
  city!:string|undefined|null
  mobile!:string|undefined|null
  building!:string|undefined|null
  apartment!:string|undefined|null
  floor!:string|undefined|null
  country!:string|undefined|null
  mark!:string|undefined|null
  OrderData : BasketItem[] | undefined
  Total:number|undefined
  email : string|undefined


  
  Api='ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6VXhNaUo5LmV5SndjbTltYVd4bFgzQnJJam8zTVRVMk56Z3NJbU5zWVhOeklqb2lUV1Z5WTJoaGJuUWlMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuckF4dlNNNnZFMDlpWC1uNWN1SXNWYzhHeWNIU2VHYXpEeG05c3MzVVhzUDI3ZXk5ZzVHY1J6VkVRd2hjREVtQk1SdnpqMDJPRWcyaFhvcFpBZUVsMXc='
  integrationID = 3528310;

  constructor(private fb:FormBuilder,
              public basketService:BasketService,
              private translate:TranslateService , 
             private i18nservice:I18nServicesService,
             private http:HttpClient,
             public accountService:AccountService,
             private toastr:ToastrService)
             {
              this.currentLange = localStorage.getItem('currentLange') || 'ar';
              this.translate.use(this.currentLange);
              this.currentCulture = 'ar'
             }
  
  ngOnInit(): void {
    this.i18nservice.localEvent.subscribe(locale=> this.translate.use(locale));
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });

    this.basketService.basketSource$.subscribe(basket=>{
      this.OrderData = basket?.items
      console.log(this.OrderData);
    });

    this.basketService.basketTotalSource$.subscribe(basket => {
      this.Total = basket!.total * 100; // استخدام العامل التصفية هنا
      console.log("basket total", this.Total);
    });

    this.accountService.currentUser$.subscribe(user=>{
      this.email = user?.email
      console.log('user email is ' , this.email) 
    })

  }

 
  
  addressForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      street:['',Validators.required],
      city:['',Validators.required],
      Mobile:['',Validators.required],
      apartment:['',Validators.required],
      floor:['',Validators.required],
      mark:['',Validators.required],
      building:['',Validators.required],
      country:['',Validators.required]
  })

  getAddressFormValues(){
    this.firstName = this.addressForm.value.firstName;
    this.LastName = this.addressForm.value.lastName;
    this.street = this.addressForm.value.street;
    this.city = this.addressForm.value.city;
    this.mobile = this.addressForm.value.Mobile;
    this.apartment = this.addressForm.value.apartment;
    this.floor = this.addressForm.value.floor;
    this.mark = this.addressForm.value.mark;
    this.building = this.addressForm.value.building;
    this.country = this.addressForm.value.country;
    this.toastr.success('تم حفظ العنوان بنجاح','Address saved successfully');

  }

  async firstStep() {
    const data = {
      api_key: this.Api
    };
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    try {
      const response = await this.http.post<any>(
        'https://accept.paymob.com/api/auth/tokens',
        JSON.stringify(data),
        { headers }
      ).toPromise();
  
      const token = response.token; // Retrieve the token from the resolved response
    console.log('first step',token)
    this.secondStep(token)
    } catch (error) {
      console.error('Error in firstStep:', error);
      // Handle the error appropriately
    }
  }

  async secondStep(token: any) {
    if (this.OrderData) {
      const items = this.OrderData.map(item => {
        return {
          name: item.productName,
          amount_cents: (item.price * item.quantity * 100).toString(),
          description: item.productNameEn,
          quantity: item.quantity.toString()
        };
      });
  
      const data = {
        auth_token: token,
        delivery_needed: 'false',
        amount_cents: this.Total,
        currency: 'EGP',
        items: items
      };
  
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      try {
        const response = await this.http.post<any>(
          'https://accept.paymob.com/api/ecommerce/orders',
          JSON.stringify(data),
          { headers }
        ).toPromise();
  
        const id = response.id;
        console.log('second step the id is', id);
        console.log('second step', token);
  
        this.thirdStep(token, id);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Error: OrderData is undefined');
    }
  }

  async thirdStep(token:any, id:any) {
    const data = {
      "auth_token": token,
      "amount_cents": this.Total, 
      "expiration": 3600, 
      "order_id": id,
      "billing_data": {
        "apartment": this.apartment, 
        "email": this.email, 
        "floor": this.floor, 
        "first_name": this.firstName, 
        "street": this.street, 
        "building": this.building, 
        "phone_number": this.mobile, 
        "shipping_method": "-", 
        "postal_code": "-", 
        "city": this.city, 
        "country": this.country, 
        "last_name": this.LastName, 
        "state": "EGP"
      }, 
      "currency": "EGP", 
      "integration_id": 3528310
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const response = await this.http.post<any>(
      'https://accept.paymob.com/api/acceptance/payment_keys',
      
      JSON.stringify(data),
      { headers }
    ).toPromise();

    const theToken = response.token;
    console.log('third step token is' ,theToken);

     this.cardPayment(theToken);
  }

  cardPayment(token:any) {
    const iframeURL = `https://accept.paymob.com/api/acceptance/iframes/740022?payment_token=${token}`;
    window.location.href = iframeURL;
  }


}
