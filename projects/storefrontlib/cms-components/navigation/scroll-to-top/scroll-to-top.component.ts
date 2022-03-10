import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { ICON_TYPE } from '../../misc/icon/icon.model';
@Component({
  selector: 'cx-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent {
  iconTypes = ICON_TYPE;
  display: boolean;

  @HostListener('document:wheel')
  onScroll(): void {
    this.display = window.scrollY > 1;
  }

  constructor() {}

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.display = false;
  }
}
