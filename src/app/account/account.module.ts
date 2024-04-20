import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { SharedModule } from '../shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ConfirmemailComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      loader:{
        provide:TranslateLoader,
        useFactory : AccounthttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
  ],
  exports:[LoginComponent]
})
export class AccountModule { }


export function AccounthttpLoaderFactory(http:HttpClient){
  return new  TranslateHttpLoader(http,'./assets/i18n/Account/','.json')

} 