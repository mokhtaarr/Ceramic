import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';
import { environment } from 'src/environments/environment';
import { CheckoutService } from '../checkout.service';
import { map, take } from 'rxjs/operators';

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
  VisaTotal!:string
  email : string|undefined
  ProductImageUrl = environment.ProductImageUrl
  customerId !:number;
  private totalPurchases!: number;
  private savedMappedData: any;
  basketData: any; // يجب تحديد نوع البيانات بناءً على ما تعود على استخدامه

  
  Api='ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6VXhNaUo5LmV5SndjbTltYVd4bFgzQnJJam8zTVRVMk56Z3NJbU5zWVhOeklqb2lUV1Z5WTJoaGJuUWlMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuckF4dlNNNnZFMDlpWC1uNWN1SXNWYzhHeWNIU2VHYXpEeG05c3MzVVhzUDI3ZXk5ZzVHY1J6VkVRd2hjREVtQk1SdnpqMDJPRWcyaFhvcFpBZUVsMXc='
  integrationID = 3528310;

  constructor(private fb:FormBuilder,
              public basketService:BasketService,
              private translate:TranslateService , 
             private i18nservice:I18nServicesService,
             private http:HttpClient,
             public accountService:AccountService,
             private toastr:ToastrService,
             private checkoutService : CheckoutService)
             {
              this.currentLange = localStorage.getItem('currentLange') || 'ar';
              this.translate.use(this.currentLange);
              this.currentCulture = this.translate.currentLang;

               this.basketService.basketTotalSource$.subscribe(totals => {
                // تحديث القيمة عند تغييرها
                this.totalPurchases = totals!.total;
               });
             }
  
  ngOnInit(): void {
    this.i18nservice.localEvent.subscribe(locale=> this.translate.use(locale));
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });

    this.basketService.basketSource$.subscribe(basket=>{
      this.OrderData = basket?.items
      // console.log(this.OrderData);
    });

    this.basketService.basketTotalSource$.subscribe(basket => {
      this.Total = Math.floor(basket!.total * 100); // تقريب الرقم للأسفل

    });

    this.accountService.currentUser$.subscribe(user=>{
      this.email = user?.email
      // console.log('user email is ' , this.email) 
    })

  

}

 
  
  addressForm = this.fb.group({
      firstName:['',
      [Validators.required,
        Validators.pattern(/^(?!.*\s{2,})[^\d]+(\s[^\d]+)?$/),
        Validators.minLength(3) ,Validators.maxLength(8)
      ]],


      lastName:['',
      [Validators.required,
        Validators.pattern(/^(?!.*\s{2,})[^\d]+(\s[^\d]+)?$/),
        Validators.minLength(3) ,Validators.maxLength(8)
      ]],


      street:['',
      [
        Validators.required,
        Validators.pattern(/^(?!.*\s{2,})[^\d]+(\s[^\d]+)?$/),
        Validators.minLength(3) ,Validators.maxLength(8)
      ]],


      city:['',
      [
        Validators.required,
        Validators.pattern(/^(?!.*\s{2,})[^\d]+(\s[^\d]+)?$/),
        Validators.minLength(3) ,Validators.maxLength(8)
      ]],

      Mobile:['', [
      Validators.required,
      Validators.minLength(11) ,Validators.maxLength(11),Validators.pattern(/^0[0-9]{10}$/),
    ]],


      apartment:[
        '',[
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.minLength(1),
          Validators.maxLength(8)
        ]],


      floor:[
        '',[
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.minLength(1),
          Validators.maxLength(8)
        ]],


      mark:['',[
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(5),
        Validators.pattern(/^[a-zA-Z0-9]+$/)

      ]],


      building:[
        '',[
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.maxLength(8)
        ]],


      country:['',
      [
        Validators.required,
        Validators.pattern(/^(?!.*\s{2,})[^\d]+(\s[^\d]+)?$/),
        Validators.minLength(3) ,Validators.maxLength(8)
      ]],
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

   const dto = {
    CustomerCode: this.mobile, 
    CustomerDescA: `${this.firstName}  ${this.LastName}`, // قم بتعيين قيمة الاسم الكامل أو ما يناسب
    CustomerDescE: `${this.firstName}  ${this.LastName}`, // قيمة الاسم بالإنجليزية
    Tel: this.mobile, // قيمة الهاتف
    Address: this.city, // قيمة العنوان
    Address2 :this.country,
    Address3 :this.street,
    AddField1 : this.building,
    AddField2 : this.floor,
    AddField3 : this.apartment,
    Remarks : this.mark,
    IsWebsite: true // أو يمكنك تعيين هذا القيمة حسب الحاجة
  };

  this.checkoutService.CreateCustomer(dto).subscribe(response => {
      // يمكنك إضافة المنطق الخاص بالاستجابة هنا
      this.customerId = response;
    },
    error => {
      // يمكنك إضافة المنطق الخاص بالخطأ هنا
      console.error('حدث خطأ أثناء إضافة العميل', error);
    }
  );
    

    this.toastr.success('تم حفظ العنوان بنجاح','Address saved successfully');

  }

  //  دالة لإرسال البيانات إلى الـ API

  // sendDataToApi() {
  //   // قم بتحويل البيانات باستخدام العملية map
  //   this.basketService.basketSource$.pipe(
  //     map(basket => {
  //       // هنا يمكنك تنسيق البيانات حسب احتياجاتك
  //       return {
  //         header_BookId: '2022',
  //         header_TermId : '6073',
  //         header_CustomerId : this.customerId,
  //         header_NotPaid : this.totalPurchases,
           
  //         // ... إلخ (قم بإضافة المزيد من الحقول حسب الحاجة)
  //         orderDetails: basket!.items.map(item => {
  //           return {
  //             itemCardId: item.basketItemId,
  //             price: item.price,
  //             quantity: item.quantity,
  //           };
  //         }),
  //       };
  //     })
  //   ).subscribe(mappedData => {
  //     this.checkoutService.createOrderHeader(mappedData).subscribe(
  //       response => {
  //             this.toastr.success(`طلبك تم بنجاح رقم الطلب : ${response.salesOfferId}`);
  //         // يمكنك إضافة المزيد من التحكم هنا بناءً على رد الـ API
  //       },
  //       error => {
  //         console.error('خطأ:', error);
  //         // يمكنك إضافة المزيد من التحكم هنا في حالة وجود خطأ
  //       }
  //     );
  //   });
  // }



//   sendDataToApi() {
//     // قم بتحويل البيانات باستخدام العملية map
//     this.basketService.basketSource$.pipe(
//       map(basket => {
//         // حفظ mappedData في المتغير
//         this.savedMappedData = {
//           header_BookId: '2022',
//           header_TermId : '6073',
//           header_CustomerId : this.customerId,
//           header_NotPaid : this.totalPurchases,
//           orderDetails: basket!.items.map(item => {
//             return {
//               itemCardId: item.basketItemId,
//               price: item.price,
//               quantity: item.quantity,
//             };
//           }),
//         };
//         return this.savedMappedData;
//       })
//     )
//   }

CreateOrder(){

  this.basketService.basketSource$.subscribe(basket  => {
     this.savedMappedData = {
      header_BookId: '2022',
      header_TermId: '6073',
      header_CustomerId: this.customerId,
      header_NotPaid: this.Total,
      orderDetails: basket!.items.map(item => {
        return {
          itemCardId: item.basketItemId,
          price: item.price,
          quantity: item.quantity,
        };
      }),
    };
  });
  
  this.checkoutService.createOrderHeader(this.savedMappedData).subscribe(
        response => {
              this.toastr.success(`طلبك تم بنجاح رقم الطلب : ${response.salesOfferId}`);
        },
        error => {
          this.toastr.error("حدث خطا اثناء محاوله اضافه الطلب");
        }
      );
}



// sendDataToApi() {
//   this.basketService.basketSource$.pipe(
//     map(basket => {
//       if (!basket || !basket.items || basket.items.length === 0) {
//         // التحقق من وجود السلة وعدم فراغها
//         return null;
//       }

//       // التحقق من وجود قيمة لـ this.customerId
//       if (!this.customerId) {
//         return null;
//       }

//       // حفظ mappedData في المتغير
//       this.savedMappedData = {
//         header_BookId: '2022',
//         header_TermId: '6073',
//         header_CustomerId: this.customerId,
//         header_NotPaid: this.totalPurchases,
//         orderDetails: basket.items.map(item => {
//           return {
//             itemCardId: item.basketItemId,
//             price: item.price,
//             quantity: item.quantity,
//           };
//         }),
//       };
//       return this.savedMappedData;
//     })
//   ).subscribe(mappedData => {
//     // يمكنك إضافة المزيد من المنطق هنا بناءً على mappedData
//   });
// }

// CreateOrder() {
//  if (!this.savedMappedData) {
//     // التحقق من وجود قيمة لـ this.savedMappedData
//     console.error('خطأ: البيانات المحولة غير متاحة.');
//     return;
//   }

//   this.checkoutService.createOrderHeader(this.savedMappedData).subscribe(
//     response => {
//       this.toastr.success(`طلبك تم بنجاح رقم الطلب: ${response.salesOfferId}`);
//       // يمكنك إضافة المزيد من التحكم هنا بناءً على رد الـ API
//     },
//     error => {
//       console.error('خطأ:', error);
//       // يمكنك إضافة المزيد من التحكم هنا في حالة وجود خطأ
//     }
//   );
// }


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
        // console.log('second step the id is', id);
        // console.log('second step', token);
  
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
