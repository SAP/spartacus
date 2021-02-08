import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { MOVE_FOCUS, TrapFocusConfig } from '../keyboard-focus.model';
import { TabFocusDirective } from '../tab/tab-focus.directive';
import { TrapFocusService } from './trap-focus.service';

/**
 * Directive that keeps the focus inside the focusable child elements,
 * also known as a _focus trap_.
 */
@Directive() // selector: '[cxTrapFocus]'
export class TrapFocusDirective extends TabFocusDirective implements OnInit {
  protected defaultConfig: TrapFocusConfig = { trap: true };

  // @Input('cxTrapFocus')
  protected config: TrapFocusConfig = {};

  @HostListener('keydown.arrowdown', ['$event'])
  @HostListener('keydown.tab', ['$event'])
  handleTrapDown = (event: KeyboardEvent) => {
    if (!!this.config.trap) {
      this.moveFocus(event, MOVE_FOCUS.NEXT);
    }
  };

  @HostListener('keydown.arrowup', ['$event'])
  @HostListener('keydown.shift.tab', ['$event'])
  handleTrapUp = (event: KeyboardEvent) => {
    if (!!this.config.trap) {
      this.moveFocus(event, MOVE_FOCUS.PREV);
    }
  };

  constructor(
    protected elementRef: ElementRef,
    protected service: TrapFocusService
  ) {
    super(elementRef, service);
  }

  /**
   * Moves the focus of the element reference up or down, depending on the increment.
   * The focus of the element is trapped to avoid it from going out of the group.
   *
   * @param event UIEvent that is used to get the target element. The event is blocked
   *   from standard execution and further bubbling.
   * @param increment indicates whether the next or previous is focussed.
   */
  protected moveFocus(event: UIEvent, increment: number) {
    if (this.service.hasFocusableChildren(this.host)) {
      this.service.moveFocus(
        this.host,
        this.config,
        increment,
        event as UIEvent
      );
    }
  }
}
