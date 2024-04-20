import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class PreventGuard implements CanActivate {
  constructor(private accountService:AccountService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.accountService.currentUser$.pipe(
        map(auth=>{
          if(auth){
            this.router.navigate(['/home']);
            return false;
          }
          else
          {
            return true;
          }
        })
      );
    }
  
  
}
