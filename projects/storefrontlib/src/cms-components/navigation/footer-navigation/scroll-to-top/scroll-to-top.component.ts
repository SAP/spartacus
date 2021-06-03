import { Component, HostListener } from '@angular/core';

const SCROLL_TO_TOP_TRUE = 100;
const SCROLL_TO_TOP_FALSE = 10;
const SCROLL_TO_TOP_TRANSITION_SPEED = 8;

@Component({
  selector: 'cx-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
})
export class ScrollToTopComponent {
  windowScrolled: boolean;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > SCROLL_TO_TOP_TRUE
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < SCROLL_TO_TOP_FALSE
    ) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(
          0,
          currentScroll - currentScroll / SCROLL_TO_TOP_TRANSITION_SPEED
        );
      }
    })();
  }
}
