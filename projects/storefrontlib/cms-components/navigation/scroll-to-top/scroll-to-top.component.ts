import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
} from '@angular/core';
import {
  WindowRef,
  CmsScrollToTopComponent,
  ScrollBehavior,
} from '@spartacus/core';
import { take } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { ICON_TYPE } from '../../misc/icon/icon.model';
@Component({
  selector: 'cx-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent {
  iconTypes = ICON_TYPE;

  @HostBinding('class.display')
  display: boolean | undefined;

  protected scrollBehavior: ScrollBehavior;
  protected displayThreshold: number;
  protected window: Window | undefined = this.winRef.nativeWindow;

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.window) {
      this.display = this.window.scrollY > this.displayThreshold;
    }
  }

  constructor(
    protected winRef: WindowRef,
    protected componentData: CmsComponentData<CmsScrollToTopComponent>
  ) {
    this.componentData.data$.pipe(take(1)).subscribe((data) => {
      this.scrollBehavior = data.scrollBehavior ?? ScrollBehavior.SMOOTH;
      this.displayThreshold =
        data.displayThreshold ?? this.window?.innerHeight ?? 200;
    });
  }

  /**
   * Scroll back to the top of the page.
   */
  scrollToTop(): void {
    this.window?.scrollTo({
      top: 0,
      behavior: this.scrollBehavior,
    });

    this.getKeyboardFocusableElement().focus();
  }

  /**
   *Get first focusable element of DOM that is not hidden or disabled.
   * @returns HTMLElement
   */
  protected getKeyboardFocusableElement(): HTMLElement {
    return [
      ...(this.window?.document?.querySelectorAll(
        'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
      ) as any),
    ].filter(
      (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
    )[0];
  }
}
