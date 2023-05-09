import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss']
})
export class PagingHeaderComponent {
  @Input() pageNumber ?: number;
  @Input() pageSize ?:number;
  @Input() TotalCount?:number
  constructor(public translate:TranslateService){}
}
