import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AutoFocusDirective } from '../autofocus/auto-focus.directive';
import { MOVE_FOCUS, TabFocusConfig } from '../keyboard-focus.model';
import { TabFocusService } from './tab-focus.service';

/**
 * Directive to move the focus of ("locked") child elements. This is useful
 * for a nested list of tabs, carousel slides or any group of elements that
 * requires horizontal navigation.
 */
@Directive({
  selector: '[cxTabFocus]',
})
export class TabFocusDirective extends AutoFocusDirective {
  /** configuration options to steer the usage */
  @Input('cxTabFocus') protected config: TabFocusConfig;

  @HostListener('keydown.arrowRight', ['$event'])
  protected handleNextTab(event: KeyboardEvent) {
    this.moveTab(event, MOVE_FOCUS.NEXT);
  }

  @HostListener('keydown.arrowLeft', ['$event'])
  protected handlePreviousTab(event: KeyboardEvent) {
    this.moveTab(event, MOVE_FOCUS.PREV);
  }

  constructor(
    protected elementRef: ElementRef,
    protected service: TabFocusService
  ) {
    super(elementRef, service);
  }

  /**
   * Moves to the next (or previous) tab. This can be driven by
   */
  protected moveTab(event: KeyboardEvent, increment: MOVE_FOCUS): void {
    if (this.config?.tab) {
      this.service.focusNext(this.host, this.config, increment);

      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * Focus the next element. If the element is focusable, it will
   * get focus instantly. If the element itself isn't focusable,
   * the first focusable decendant will be focussed. If that also fails,
   * we use scrollIntoView only.
   */
  protected focus(next: HTMLElement) {
    if (next !== document.activeElement) {
      this.service
        .findFocusable(next, true)
        .find(Boolean)
        ?.focus();
    }
    if (next !== document.activeElement) {
      next.scrollIntoView();
    }
  }
}
