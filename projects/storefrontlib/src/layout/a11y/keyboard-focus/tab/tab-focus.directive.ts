import { Directive, ElementRef, HostListener } from '@angular/core';
import { AutoFocusDirective } from '../autofocus/auto-focus.directive';
import { MOVE_FOCUS, TabFocusConfig } from '../keyboard-focus.model';
import { TabFocusService } from './tab-focus.service';

/**
 * Directive to move the focus of ("locked") child elements. This is useful
 * for a nested list of tabs, carousel slides or any group of elements that
 * requires horizontal navigation.
 */
@Directive() // selector: '[cxTabFocus]'
export class TabFocusDirective extends AutoFocusDirective {
  /** `tab` defaults to true if the directive `cxTabFocus` is used. */
  protected defaultConfig: TabFocusConfig = { tab: true };

  // @Input('cxTabFocus')
  protected config: TabFocusConfig = {};

  @HostListener('keydown.arrowRight', ['$event'])
  handleNextTab(event: KeyboardEvent) {
    if (this.config?.tab) {
      this.service.moveTab(this.host, this.config, MOVE_FOCUS.NEXT, event);
    }
  }

  @HostListener('keydown.arrowLeft', ['$event'])
  handlePreviousTab(event: KeyboardEvent) {
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
