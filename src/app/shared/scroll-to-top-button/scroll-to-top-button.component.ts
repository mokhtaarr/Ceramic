import { Component, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top-button',
  templateUrl: './scroll-to-top-button.component.html',
  styleUrls: ['./scroll-to-top-button.component.scss']
})
export class ScrollToTopButtonComponent {
  @ViewChild('button') button: any;

  constructor(private renderer: Renderer2) {}

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
