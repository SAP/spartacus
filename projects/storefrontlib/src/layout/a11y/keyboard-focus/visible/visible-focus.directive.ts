import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { BaseFocusDirective } from '../base/base-focus.directive';
import { VisibleFocusConfig } from '../keyboard-focus.model';

/**
 * Directive implementation that adds a CSS class to the host element
 * when the moused is used to focus an element. As soon as the keyboard
 * is used, the class is removed.
 */
@Directive({
  selector: '[cxVisibleFocus]',
})
export class VisibleFocusDirective extends BaseFocusDirective
  implements OnInit {
  protected defaultConfig: VisibleFocusConfig = { disableMouseFocus: true };
  @Input('cxVisibleFocus') protected config: VisibleFocusConfig;

  /** controls a polyfill for the lacking focus-visible feature */
  @HostBinding('class.mouse-focus') visibleFocus = false;

  @HostListener('mousedown') handleMousedown() {
    if (this.shouldFocusVisible) {
      this.visibleFocus = true;
    }
  }

  @HostListener('keydown') handleKeydown() {
    if (this.shouldFocusVisible) {
      this.visibleFocus = false;
    }
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected get shouldFocusVisible(): boolean {
    return this.config?.disableMouseFocus;
  }
}
