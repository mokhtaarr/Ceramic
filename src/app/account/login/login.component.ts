import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { event } from 'jquery';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  currentLange!:string;


  constructor(private translate:TranslateService , private i18nservice:I18nServicesService ){
    this.currentLange = localStorage.getItem('currentLange') || 'ar';
    this.translate.use(this.currentLange);
   
  }


  ngOnInit(): void {
    this.i18nservice.localEvent.subscribe(locale=> this.translate.use(locale));

   }
}
