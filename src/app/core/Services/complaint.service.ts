import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { complaints } from 'src/app/shared/models/complaint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient,public toastr:ToastrService, private route : Router) { }

  AddingComplaint(formData:any){

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    
    return this.http.post<complaints>(this.baseUrl+'Complaint/AddingComplaint',formData , { headers }).pipe(
      map(()=>{
        this.toastr.success("تم اضافه طلب الشكوى بنجاح"),
        this.route.navigateByUrl('/')
      }),
      catchError(() => {
        this.toastr.error("حدث خطأ أثناء إضافة طلب شكوى");
        return EMPTY;
      })
    );
  }

  addComplaintForm(formData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl+'Complaint/AddingComplaint', formData);
  }
}
