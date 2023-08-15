import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
 baseUrl = environment.apiUrl;
 private currentUserSource= new ReplaySubject<User|null>(1);
 currentUser$=this.currentUserSource.asObservable();
  constructor(private http:HttpClient,private router:Router,private toastr:ToastrService ) { }

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
        localStorage.setItem('token',user.token);
        this.toastr.success('تم تسجيل جديد بنجاح يرجي تاكيد الايميل','New registration completed successfully');

      })
    )
  }

  login(values:any)
  {
    return this.http.post<User>(this.baseUrl+'account/login',values).pipe(
      map(user=>{
        localStorage.setItem('token',user.token);
        this.currentUserSource.next(user);
        this.toastr.success('تم تسجيل الدخول بنجاح','Logged in successfully');
        return user;
      })
    )
  }


  logout()
  {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
    this.toastr.success('تم الخروج ','Exit was done');

    
  }

    checkEmailExists(email:string)
    {
      return this.http.get<boolean>(this.baseUrl+'account/emailexists?email='+email);
    }

    confirmEmail(model: any) {
      return this.http.post(this.baseUrl + 'account/confirmemail', model);
    }
}
