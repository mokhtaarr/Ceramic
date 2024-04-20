import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { param } from 'jquery';
import { ResetPassword } from 'src/app/shared/models/resetPassword';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  currentLange!:string;
  currentCulture?: string;

  token : string | undefined;
  email : string | undefined;
  ResetPasswordForm !: FormGroup
  showPassword : boolean = false;
  

  constructor(private translate:TranslateService, 
    private accountService:AccountService,
    private router:Router,
    private i18nservice:I18nServicesService,
    private activatedRoute:ActivatedRoute,private fb:FormBuilder)
    {
      this.currentLange = localStorage.getItem('currentLange') || 'ar';
      this.translate.use(this.currentLange);
    }
  ngOnInit(): void {
    this.i18nservice.localEvent.subscribe(locale=> this.translate.use(locale));

    this.activatedRoute.queryParamMap.subscribe({
      next:(params : any) =>{
        this.token = params.get('token')
        this.email = params.get('email')

        if(this.token && this.email){
          this.iniatializeForm(this.email)
        }
      }
    })
       
  }

  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
}


   iniatializeForm(email:string){
    this.ResetPasswordForm = this.fb.group({
      email : [{value : email, disabled:true}],
      newPassword:['',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/),
        Validators.minLength(8),
        Validators.maxLength(20),
      ]]
      
    })
  }

  resetPassword(){
    if(this.ResetPasswordForm.valid && this.email && this.token){
      const model : ResetPassword = {
        token : this.token,
        email : this.email,
        newPassword : this.ResetPasswordForm.get('newPassword')?.value
      };

      console.log('model',model)
      this.accountService.resetPssword(model).subscribe({});

    }

  }

}
