import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';
import { I18nServicesService } from 'src/app/Services/i18n-services.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.scss']
})
export class ConfirmemailComponent implements OnInit {
  emailConfirmed: boolean = false;
  urlParams: any = {};
  currentLange!:string;

  constructor(
    private route: ActivatedRoute,
    private accountService:AccountService,
    private toastr:ToastrService,
    private translate:TranslateService , 
     private i18nservice:I18nServicesService){

      this.currentLange = localStorage.getItem('currentLange') || 'ar';
      this.translate.use(this.currentLange);
  }
  ngOnInit(): void {
    this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
    this.urlParams.userid = this.route.snapshot.queryParamMap.get('userid');
    this.confirmEmail();

    this.i18nservice.localEvent.subscribe(locale=> this.translate.use(locale));
  }

  confirmEmail() {
    this.accountService.confirmEmail(this.urlParams).subscribe(
      () => {
        console.log('success');
        this.toastr.success('تم تاكيد الايميل بنجاح','Gamil is Confirm successfully');

        this.emailConfirmed = true;
      },
      (error) => {
        console.log(error);
        this.emailConfirmed = false;
      }
    );
  }
}
