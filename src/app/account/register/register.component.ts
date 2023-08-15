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
    displayName:['',Validators.required],
    PhoneNumber:['',Validators.required],
    City:['',Validators.required],
    Street:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required]
  })

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/shop')
    })
  }
}
