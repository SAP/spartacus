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
  /**
   * @deprecated use `hideVisibleFocus` instead
   */
  @HostBinding('class.mouse-focus') mouseFocus = false;
  /**
   * The `hide-visible-focus` hides the visual focus for keyboard users.
   */
  @HostBinding('class.hide-visible-focus') hideVisibleFocus = false;

  @HostListener('mousedown') handleMousedown() {
    if (this.shouldDisableVisibleFocus) {
      this.hideVisibleFocus = true;
      this.mouseFocus = true;
    }
  }

  @HostListener('keydown', ['$event']) handleKeydown(event: KeyboardEvent) {
    if (this.shouldDisableVisibleFocus) {
      this.hideVisibleFocus = !this.isMouseEvent(event);
      this.mouseFocus = !this.isMouseEvent(event);
    }
  }

  /**
   * Indicates whether the configurations setup to disable visual focus.
   */
  protected get shouldDisableVisibleFocus(): boolean {
    return this.config?.disableVisibleFocus || this.config?.disableMouseFocus;
  }

  /**
   * Indicates whether the current event is driven by the mouse or the keyboard.
   *
   * If the keyboard is used to navigate the OS or the browser, or used to fill in a form,
   * we consider the event to be a mouse event.
   */
  protected isMouseEvent(event: KeyboardEvent): boolean {
    return (
      event.code === 'Tab' ||
      !(
        event.metaKey ||
        ((this.hideVisibleFocus || this.mouseFocus) &&
          (event.target as HTMLElement).tagName === 'INPUT')
      )
    );
  }
}
