import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  OnInit,
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
export class ScrollToTopComponent implements OnInit {
  iconTypes = ICON_TYPE;

  @HostBinding('class.display')
  display: boolean | undefined;

  protected window: Window | undefined = this.winRef.nativeWindow;
  protected scrollBehavior: ScrollBehavior = ScrollBehavior.SMOOTH;
  protected displayThreshold: number = (this.window?.innerHeight ?? 400) / 2;

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.window) {
      this.display = this.window.scrollY > this.displayThreshold;
    }
  }

  constructor(
    protected winRef: WindowRef,
    protected componentData: CmsComponentData<CmsScrollToTopComponent>
  ) {}

  ngOnInit(): void {
    this.setConfig();
  }

  protected setConfig(): void {
    this.componentData.data$.pipe(take(1)).subscribe((data) => {
      this.scrollBehavior = data.scrollBehavior ?? this.scrollBehavior;
      this.displayThreshold = data.displayThreshold ?? this.displayThreshold;
    });
  }

  /**
   * Scroll back to the top of the page and set focus on top most focusable element.
   */
  scrollToTop(): void {
    this.getFirstKeyboardFocusableElement().focus();
    this.window?.scrollTo({
      top: 0,
      behavior: this.scrollBehavior,
    });
  }

  /**
   *Get first focusable element in the DOM that is not hidden or disabled.
   * @returns HTMLElement
   */
  protected getFirstKeyboardFocusableElement(): HTMLElement {
    return [
      ...(this.window?.document?.querySelectorAll(
        'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
      ) as any),
    ].filter(
      (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
    )[0];
  }
}
