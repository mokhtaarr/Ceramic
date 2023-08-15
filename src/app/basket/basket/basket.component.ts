import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { BasketItem } from 'src/app/shared/models/basket';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit  {
  currentLange!:string;
  currentCulture: string;
  OrderData : BasketItem[] | undefined
  email : string|undefined
  city : string|undefined

  Api='ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T0RjeE5Ea3lMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuOXVLQnVkX1BHSFBJRXoxbHlsd25ZZnd0eWxmZUpsa3lMT240Vmo3X3hYaFJKX2t5cXJNRG94azFDTDd0djVFZUpJd1Zya2NVendkRjNLMjNtQzcydFE=';
  integrationID = 4077310;

  constructor(public basketService:BasketService,
             private translate:TranslateService , 
             private i18nservice:I18nServicesService,
             private http:HttpClient,
             public accountService:AccountService){
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
    })

  
    this.accountService.currentUser$.subscribe(user=>{
      this.city = user?.city
      console.log(this.city);
      console.log(user?.email);
      console.log(user?.displayName);
      console.log(user?.street);
      console.log(user?.phoneNumber);
      
    })

    // this.firstStep();
  }



   incrementQuantity(item:BasketItem)
  {
    this.basketService.addItemToBasket(item);
  }

  removeItem(id:number,quantity:number)
  {
    this.basketService.removeItemFromBasket(id,quantity);
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
    console.log(token)
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
        amount_cents: '100',
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
        console.log('second', id);
        console.log('second', token);
  
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
      "amount_cents": "100", 
      "expiration": 3600, 
      "order_id": id,
      "billing_data": {
        "apartment": "803", 
        "email": "claudette09@exa.com", 
        "floor": "42", 
        "first_name": "Clifford", 
        "street": "Ethan Land", 
        "building": "8028", 
        "phone_number": "+86(8)9135210487", 
        "shipping_method": "PKG", 
        "postal_code": "01898", 
        "city": "Jaskolskiburgh", 
        "country": "CR", 
        "last_name": "Nicolas", 
        "state": "Utah"
      }, 
      "currency": "EGP", 
      "integration_id": 4077310
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const response = await this.http.post<any>(
      'https://accept.paymob.com/api/acceptance/payment_keys',
      
      JSON.stringify(data),
      { headers }
    ).toPromise();

    const theToken = response.token;
    console.log('third' ,theToken);

     this.cardPayment(theToken);
  }

  cardPayment(token:any) {
    const iframeURL = `https://accept.paymob.com/api/acceptance/iframes/778841?payment_token=${token}`;
    window.location.href = iframeURL;
  }

 

}
