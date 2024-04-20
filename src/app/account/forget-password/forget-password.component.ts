import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  currentLange!:string;
  currentCulture: string;
  UserEmail : string | undefined | null;

  constructor(private translate:TranslateService, 
    private accountService:AccountService,
    private router:Router,
    private i18nservice:I18nServicesService,
    private activatedRoute:ActivatedRoute,private fb:FormBuilder,
    ){
      this.currentLange = localStorage.getItem('currentLange') || 'ar';
      this.translate.use(this.currentLange);
      this.currentCulture = this.translate.currentLang;
    }
  ngOnInit(): void {
    this.i18nservice.localEvent.subscribe(locale=> this.translate.use(locale));
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });
       }

    forgetPasswordForm = this.fb.group({
      email:['',
      [
        Validators.required,
        Validators.minLength(5), // قدر الحد الأدنى حسب احتياجاتك
        Validators.maxLength(50), // قدر الحد الأقصى حسب احتياجاتك
        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ]
      ],
     });

     onSubmit(){
      this.UserEmail = this.forgetPasswordForm.value.email ;
      this.accountService.forgetPassword(this.UserEmail).subscribe({})
     }

       
    
}
