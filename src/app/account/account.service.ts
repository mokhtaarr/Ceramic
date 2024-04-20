import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { I18nServicesService } from '../Services/i18n-services.service';
import { error } from 'jquery';
import { ResetPassword } from '../shared/models/resetPassword';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  currentCulture: string = "";

 returnUrl:string="";
 baseUrl = environment.apiUrl;
 private currentUserSource= new ReplaySubject<User|null>(1);
 currentUser$=this.currentUserSource.asObservable();

  constructor(private http:HttpClient,private router:Router,private toastr:ToastrService,
    private activatedRoute:ActivatedRoute,private translate:TranslateService)
    { 
      this.returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.currentCulture = event.lang;
      });
    }


  loadCurrentUser(token:string|null)
  {
    if(token==null)
    {
      this.currentUserSource.next(null);
      return of(null);
    }
    let headers= new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`);

    return this.http.get<User>(this.baseUrl +'account' ,{headers}).pipe(
      map(user=>{
        if(user)
        {
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
          return user;
        }
        else
        {
          return null;
        }
       
      })
    )
  }

// انا هنا مسحت         this.currentUserSource.next(user);

  register(values:any)
  {
    return this.http.post<User>(this.baseUrl+'account/register',values).pipe(
      map(user=>{
        var message = user.message;
        var messageEn = user.messageEn;
        var statu = user.statu

        if(statu == true)
        {
          
          if(this.currentCulture == 'ar')
            this.toastr.success(message);
          // this.router.navigateByUrl('/shop')

          if(this.currentCulture == 'en')
          this.toastr.success(messageEn);

        }
        if(statu == false)
        if(this.currentCulture == 'ar')
        this.toastr.error(message);
      // this.router.navigateByUrl('/shop')

      if(this.currentCulture == 'en')
      this.toastr.error(messageEn);
      })
    )
  }

  login(values:any)
  {
    return this.http.post<User>(this.baseUrl+'account/login',values).pipe(
      map(user=>{

        var statu = user.statu;
        var message = user.message;
        var messageEn = user.messageEn;

        if(statu == true)
        {
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
          

          if(this.currentCulture == 'ar')
          this.toastr.success(message);
          // this.router.navigateByUrl('/shop')

          if(this.currentCulture == 'en')
          this.toastr.success(messageEn);


          this.router.navigateByUrl(this.returnUrl)
        }

        if(statu == false)
        {
          if(this.currentCulture == 'ar')
          this.toastr.error(message);
          // this.router.navigateByUrl('/shop')

          if(this.currentCulture == 'en')
          this.toastr.error(messageEn);

        }
             
        return user;

      })
    )
  }


  logout()
  {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');

    if(this.currentCulture == 'ar')
    this.toastr.success("تم الخروج");
    // this.router.navigateByUrl('/shop')

    if(this.currentCulture == 'en')
    this.toastr.success("Exit was done");
    
  }

    checkEmailExists(email:string)
    {
      return this.http.get<boolean>(this.baseUrl+'account/emailexists?email='+email);
    }

    confirmEmail(model: any) {
      return this.http.post(this.baseUrl + 'account/confirmemail', model);
    }

    forgetPassword(email: string | undefined | null) {
      return this.http.post<any>(`${this.baseUrl}Account/ForgetPassword?email=${email}`,{}).pipe(
        map((res) => {
          const statu = res.statu;
          const message = res.message;
          const messageEn = res.messageEn;
  
          if (statu === true) {
            if (this.currentCulture === 'ar') {
              this.toastr.success(message);
            }
  
            if (this.currentCulture === 'en') {
              this.toastr.success(messageEn);
            }

            this.router.navigateByUrl("/");
          }
  
          if (statu === false) {
            if (this.currentCulture === 'ar') {
              this.toastr.error(message);
            }
  
            if (this.currentCulture === 'en') {
              this.toastr.error(messageEn);
            }
          }
        })
      );
    }
    
    // resetPssword(model:ResetPassword){
    //   return this.http.post<ResetPassword>(this.baseUrl+'Account/reset-password',model) 
    // }

    resetPssword(model:ResetPassword){
      return this.http.put<ResetPassword>(this.baseUrl+'Account/reset-password',model).pipe(
        map((res) => {
          const statu = res.statu;
          const message = res.message;
          const messageEn = res.messageEn;
  
          if (statu === true) {
            if (this.currentCulture === 'ar') {
              this.toastr.success(message);
            }
  
            if (this.currentCulture === 'en') {
              this.toastr.success(messageEn);
            }

            this.router.navigateByUrl("/account/login");
          }
  
          if (statu === false) {
            if (this.currentCulture === 'ar') {
              this.toastr.error(message);
            }
  
            if (this.currentCulture === 'en') {
              this.toastr.error(messageEn);
            }
          }
        })
      );
    }
}
