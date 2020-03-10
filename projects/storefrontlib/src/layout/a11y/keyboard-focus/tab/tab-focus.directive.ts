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
  /** tab is default if the directive is used directly */
  protected defaultConfig: TabFocusConfig = { tab: true };

  /** configuration options to steer the usage */
  @Input('cxTabFocus') protected config: TabFocusConfig = {};

  @HostListener('keydown.arrowRight', ['$event'])
  protected handleNextTab(event: KeyboardEvent) {
    if (this.config?.tab) {
      this.service.moveTab(this.host, this.config, MOVE_FOCUS.NEXT, event);
    }
  }

  @HostListener('keydown.arrowLeft', ['$event'])
  protected handlePreviousTab(event: KeyboardEvent) {
    if (this.config?.tab) {
      this.service.moveTab(this.host, this.config, MOVE_FOCUS.PREV, event);
    }
  }

  constructor(
    protected elementRef: ElementRef,
    protected service: TabFocusService
  ) {
    super(elementRef, service);
  }
}
