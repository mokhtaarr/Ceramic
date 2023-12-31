import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  currentLange!:string;
  showPassword: boolean = false;

  
  constructor(private translate:TranslateService , 
              private i18nservice:I18nServicesService,
              private fb:FormBuilder,
              private accountService:AccountService,
              private router:Router) {

                this.currentLange = localStorage.getItem('currentLange') || 'ar';
                this.translate.use(this.currentLange);
               }

  
  ngOnInit(): void {
    this.i18nservice.localEvent.subscribe(locale=> this.translate.use(locale));
    
   }
 
  registerForm=this.fb.group({

    displayName:['', [Validators.required, 
      Validators.pattern(/^(?!.*\s{2,})[^\d]+(\s[^\d]+)?$/),
      Validators.minLength(8) ,Validators.maxLength(15)]],

    PhoneNumber:['', [
      Validators.required,
      Validators.minLength(11) ,Validators.maxLength(11),Validators.pattern(/^0[0-9]{10}$/),
    ]],

    City:['',[Validators.required , Validators.pattern(/^(?!.*\s{2,})[^\d]+(\s[^\d]+)?$/),Validators.minLength(3) ,Validators.maxLength(15)]],

    Street:['',[Validators.required,Validators.pattern(/^(?!.*\s{2,})[^\d]+(\s[^\d]+)?$/),Validators.minLength(3) ,Validators.maxLength(15)]],

    email:['',
    [
      Validators.required,
      Validators.minLength(5), // قدر الحد الأدنى حسب احتياجاتك
      Validators.maxLength(50), // قدر الحد الأقصى حسب احتياجاتك
      Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
    ]
    ],

    password:['',
    [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]+$/),
      Validators.minLength(5),
      Validators.maxLength(20),
    ]]
  })

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      // next: () => this.router.navigateByUrl('/shop')
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
}

}
