import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { EscapeFocusDirective } from '../escape/escape-focus.directive';
import { AutoFocusConfig } from '../keyboard-focus.model';
import { AutoFocusService } from './auto-focus.service';

/**
 * Directive that focus the first nested focusable element based on
 * state and configuration:
 * 1. element that was left in a focused state
 * 2. element selected based on a specific selector configured (i.e. 'button[type=submit]')
 * 3. element marked with the native `autofocus` attribute
 * 4. select the first focusable element
 *
 * The autofocus selector configuration allows for the pseudo host selector, which means that
 * the host element is selected (similar to autofocus = false).
 *
 * Please note that the configured selector must
 * select a focusable element.
 *
 * Example configurations:
 *
 * `<div [cxAutoFocus]="{autofocus: false}">[...]</div>`
 *
 * `<div [cxAutoFocus]="{autofocus: 'button.active'}">[...]</div>`
 *
 */
@Directive({
  selector: '[cxAutoFocus]',
})
export class AutoFocusDirective extends EscapeFocusDirective
  implements AfterViewInit {
  /** The AutoFocusDirective will be using autofocus by default  */
  protected defaultConfig: AutoFocusConfig = { autofocus: true };

  @Input('cxAutoFocus') protected config: AutoFocusConfig;

  private isTouchedByMouse = false;
  @HostListener('mousedown') handleMousedown() {
    this.isTouchedByMouse = true;
  }

  constructor(
    protected elementRef: ElementRef,
    protected autoFocusService: AutoFocusService
  ) {
    super(elementRef, autoFocusService);
  }

  /**
   * Focus the element explicitly if it was focussed before.
   */
  ngAfterViewInit(): void {
    if (this.shouldAutofocus) {
      // Mimic the focus without setting the actual focus on the host.
      this.handleFocus();
    }
    if (!this.shouldAutofocus || this.hasPersistedFocus) {
      super.ngAfterViewInit();
    }
  }

  /**
   * Handles autofocus for the nested focusable element. The first focusable
   * element will be focussed.
   */
  handleFocus(event?: KeyboardEvent) {
    if (!this.isTouchedByMouse && this.shouldAutofocus) {
      this.firstFocusable?.focus();
    }
    super.handleFocus(event);
    this.isTouchedByMouse = false;
  }

  /**
   * Helper function to get the first focusable child element
   */
  protected get hasPersistedFocus() {
    return this.autoFocusService.hasPersistedFocus(this.host, this.config);
  }

  /**
   * Helper function to indicate whether we should use autofocus for the
   * child elements.
   * We keep this private to not polute the API.
   */
  private get shouldAutofocus(): boolean {
    return !!this.config?.autofocus;
  }

  /**
   * Helper function to get the first focusable child element.
   * We keep this private to not polute the API.
   */
  private get firstFocusable(): HTMLElement {
    return this.autoFocusService.findFirstFocusable(this.host, this.config);
  }
}
