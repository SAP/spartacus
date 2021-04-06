import { Directive, HostBinding, HostListener } from '@angular/core';
import { BaseFocusDirective } from '../base/base-focus.directive';
import { VisibleFocusConfig } from '../keyboard-focus.model';

/**
 * Directive implementation that adds a CSS class to the host element
 * when the moused is used to focus an element. As soon as the keyboard
 * is used, the class is removed.
 *
 * This feature must be explicitly enabled with the `disableMouseFocus` config.
 *
 * The appearance of the visual focus depends on the CSS implementation to
 * begin with. Spartacus styles add a blue border around each focusable element.
 * This can be considered annoying by keyboard users, as they won't need such a
 * strong indication of the selected element.
 */
@Directive() // selector: '[cxVisibleFocus]'
export class VisibleFocusDirective extends BaseFocusDirective {
  protected isVisible = false;
  protected defaultConfig: VisibleFocusConfig = {
    disableMouseFocus: true,
  };

  // @Input('cxVisibleFocus')
  protected config: VisibleFocusConfig;

  /** Controls a css class to hide focus visible CSS rules */
  @HostBinding('class.mouse-focus') mouseFocus = false;

  @HostListener('mousedown') handleMousedown() {
    if (this.shouldFocusVisible) {
      this.mouseFocus = true;
    }
  }

  @HostListener('keydown', ['$event']) handleKeydown(event: KeyboardEvent) {
    if (this.shouldFocusVisible) {
      this.mouseFocus = !this.isNavigating(event);
    }
  }

  /**
   * Indicates whether the configurations setup to disable visual focus.
   */
  protected get shouldFocusVisible(): boolean {
    return this.config?.disableMouseFocus;
  }

  /**
   * Indicates whether the event is used to navigate the storefront. Some keyboard events
   * are used by mouse users to fill a form or interact with the OS or browser.
   */
  protected isNavigating(event: KeyboardEvent): boolean {
    // when the tab key is used, users are for navigating away from the current (form) element
    if (event.code === 'Tab') {
      this.isVisible = true;
    }
    // when the cmd/ctrl, shift or option keys are used
    // the user doesn't navigate the storefront
    else if (
      !this.isVisible &&
      (event.metaKey || event.shiftKey || event.altKey)
    ) {
      this.isVisible = false;
    } else if (
      ['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)
    ) {
      // If the user fill in a form, we don't considering it part of storefront navigation.
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }

    return this.isVisible;
  }
}
