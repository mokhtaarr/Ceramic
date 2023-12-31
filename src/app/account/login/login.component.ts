import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { event } from 'jquery';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  currentLange!:string;


  constructor(private translate:TranslateService , 
              private i18nservice:I18nServicesService,
              private accountService:AccountService,
              private router:Router,
              private activatedRoute:ActivatedRoute ){

    this.currentLange = localStorage.getItem('currentLange') || 'ar';
    this.translate.use(this.currentLange);
    
    this.returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';

  }
  returnUrl:string="";

  loginForm= new FormGroup({
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })
  
  ngOnInit(): void {
    this.i18nservice.localEvent.subscribe(locale=> this.translate.use(locale));
   

   }

   onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      // next:user=>this.router.navigateByUrl(this.returnUrl)
    })
   }
}
