import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  scrollToTarget() {
    const middleOfPage = window.innerHeight / 5;
    window.scrollTo({ top: middleOfPage, behavior: 'smooth' });

  }
}
