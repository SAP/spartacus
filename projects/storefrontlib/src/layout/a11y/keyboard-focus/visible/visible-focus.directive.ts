import { Directive, HostBinding, HostListener } from '@angular/core';
import { BaseFocusDirective } from '../base/base-focus.directive';
import { VisibleFocusConfig } from '../keyboard-focus.model';

/**
 * Directive implementation that adds a CSS class to the host element
 * when the moused is used to focus an element. As soon as the keyboard
 * is used, the class is removed.
 */
@Directive() // selector: '[cxVisibleFocus]'
export class VisibleFocusDirective extends BaseFocusDirective {
  protected defaultConfig: VisibleFocusConfig = { disableMouseFocus: true };

  // @Input('cxVisibleFocus')
  protected config: VisibleFocusConfig;

  /** controls a polyfill class for the lacking focus-visible feature */
  @HostBinding('class.mouse-focus') mouseFocus = false;

  @HostListener('mousedown') handleMousedown() {
    if (this.shouldFocusVisible) {
      this.mouseFocus = true;
    }
  }

  @HostListener('keydown', ['$event']) handleKeydown(event: KeyboardEvent) {
    if (this.shouldFocusVisible) {
      this.mouseFocus = !this.isMouseEvent(event);
    }
  }

  protected get shouldFocusVisible(): boolean {
    return this.config?.disableMouseFocus;
  }

  /**
   * Indicates whether the current event is driven by the mouse or the keyboard.
   *
   * If the keyboard is used to navigate the OS or the browser, or used ot fill in a form,
   * we consider the event to be a mouse event.
   */
  protected isMouseEvent(event: KeyboardEvent): boolean {
    return (
      event.code === 'Tab' ||
      !(
        event.metaKey ||
        (this.mouseFocus && (event.target as HTMLElement).tagName === 'INPUT')
      )
    );
  }
}
