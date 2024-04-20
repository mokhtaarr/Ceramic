import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError, map } from 'rxjs';
import { unvaliableProduct } from 'src/app/shared/models/unvalibleProduct';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductRequestService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient,public toastr:ToastrService, private route : Router) {
    
   }

   AddingProduct(formData:any){

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    
    return this.http.post<unvaliableProduct>(this.baseUrl+'order/AddingUnvaliableProduct',formData , { headers }).pipe(
      map(()=>{
        this.toastr.success("تم اضافة الطلب بنجاح"),
        this.route.navigateByUrl('/')
      }),
      catchError(() => {
        this.toastr.error("حدث خطأ أثناء إضافة طلب منتج");
        return EMPTY;
      })
    );
  }
}
