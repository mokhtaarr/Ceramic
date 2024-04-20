import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddCustomer } from '../shared/models/AddCustomerData';
import { ActivatedRoute } from '@angular/router';
import { OrderDataDto } from '../shared/models/orderDataDto';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http : HttpClient , private route: ActivatedRoute) { 

     
    }

  public CreateCustomer(customer:any):Observable<any>
  {
    return this.http.post<any>(`${environment.apiUrl}Customer`,customer);
  }

  public createOrderHeader(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}Order/CreateOrderHeader`, data);
  }

  getState(): any {
    const data = this.route.snapshot.queryParams;
    const id = data['id'];
    const order = data['order'];
    const success = data['success'];
    const pending = data['pending'];
    const hmac = data['hmac'];
    return data;
  }

  public GetUserOrders(Useremail : string):Observable<OrderDataDto[]>{
    return this.http.get<OrderDataDto[]>(`${environment.apiUrl}Order/GetUserOrders?email=${Useremail}`);

  }

}
