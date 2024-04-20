import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TestErrorComponent } from './test-error/test-error.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { USerComplaintsComponent } from './user-complaints/user-complaints.component';
import { RequestProductComponent } from './request-product/request-product.component';

@NgModule({
  declarations: [NavBarComponent, SectionHeaderComponent, TestErrorComponent, ServerErrorComponent, NotFoundComponent, FooterComponent, USerComplaintsComponent, RequestProductComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    RouterModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      defaultLanguage:'ar',
      loader:{
        provide:TranslateLoader,
        useFactory : httpTranslateLoader,
        deps:[HttpClient]
      }
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    SharedModule,
    BreadcrumbModule


 ],
  exports:[
    NavBarComponent,
    SectionHeaderComponent,
    NgxSpinnerModule,
    FooterComponent,
    USerComplaintsComponent,
    RequestProductComponent
  ]
})
export class CoreModule { }

export function httpTranslateLoader(http:HttpClient){
  return new  TranslateHttpLoader(http,'./assets/i18n/','.json')

} 
