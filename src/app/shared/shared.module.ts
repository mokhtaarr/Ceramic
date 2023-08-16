import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselModule} from 'ngx-bootstrap/carousel'
import { SharedRoutingModule } from './shared-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { ScrollToTopButtonComponent } from './scroll-to-top-button/scroll-to-top-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StepperComponent } from './components/stepper/stepper.component';
import {CdkStepperModule} from '@angular/cdk/stepper';




@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    ScrollToTopButtonComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage:'ar',
      loader:{
        provide:TranslateLoader,
        useFactory : SharedhttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    CdkStepperModule

  ],
  exports:[
    CarouselModule,
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    ScrollToTopButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    StepperComponent,
    CdkStepperModule
  ]
})
export class SharedModule { }
export function SharedhttpLoaderFactory(http:HttpClient){
  return new  TranslateHttpLoader(http,'./assets/i18n/','.json')

} 