import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { ICON_TYPE } from '../../misc/icon/icon.model';
@Component({
  selector: 'cx-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent {
  iconTypes = ICON_TYPE;
  display: boolean;

  protected window: Window | undefined = this.winRef.nativeWindow;

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.window) {
      this.display = this.window.scrollY > 50;
    }
  }

  constructor(protected winRef: WindowRef) {}

  scrollToTop(): void {
    if (this.window) {
      this.window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this.display = false;
    }
  }
}
