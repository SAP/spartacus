import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { EscapeFocusDirective } from '../escape/escape-focus.directive';
import { AutoFocusConfig } from '../keyboard-focus.model';
import { AutoFocusService } from './auto-focus.service';

/**
 * Directive that focus the first nested _focusable_ element based on state and configuration:
 *
 * 1. focusable element that was left in a focused state (aka _persisted_ focus)
 * 2. focusable element selected by configured CSS selector (i.e. 'button[type=submit]')
 * 3. focusable element marked with the native HTML5 `autofocus` attribute
 * 4. first focusable element
 * 5. the host element, in case the configured CSS selector is `:host`.
 *
 * Example configurations:
 *
 * `<div cxAutoFocus>[...]</div>`
 *
 * `<div [cxAutoFocus]="{autofocus: false}">[...]</div>`
 *
 * `<div [cxAutoFocus]="{autofocus: 'button.active'}">[...]</div>`
 *
 * `<div [cxAutoFocus]="{autofocus: ':host'}">[...]</div>`
 *
 * When your element is added dynamically (ie. by using an *ngIf or after a DOM change), the
 * focus can be refreshed by using the refreshFocus configuration.
 */
@Directive() // selector: '[cxAutoFocus]'
export class AutoFocusDirective
  extends EscapeFocusDirective
  implements AfterViewInit, OnChanges
{
  /** The AutoFocusDirective will be using autofocus by default  */
  protected defaultConfig: AutoFocusConfig = { autofocus: true };

  // @Input('cxAutoFocus')
  protected config: AutoFocusConfig;

  constructor(
    protected elementRef: ElementRef,
    protected service: AutoFocusService
  ) {
    super(elementRef, service);
  }

  /**
   * Focus the element explicitly if it was focussed before.
   */
  ngAfterViewInit(): void {
    if (this.shouldAutofocus) {
      this.handleFocus();
    }
    if (!this.shouldAutofocus || this.hasPersistedFocus) {
      super.ngAfterViewInit();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // responsible for refresh focus based on the configured refresh property name
    if (!!(changes.config.currentValue as AutoFocusConfig)?.refreshFocus) {
      // ensure the autofocus when it's to provided initially
      if (!this.config.autofocus) {
        this.config.autofocus = true;
      }
      this.handleFocus();
    }
    super.ngOnChanges(changes);
  }

  /**
   * Mimic the focus without setting the actual focus on the host. The first
   * focusable child element will be focussed.
   */
  handleFocus(event?: KeyboardEvent) {
    if (this.shouldAutofocus) {
      if (!event?.target || event.target === this.host) {
        this.firstFocusable?.focus();
      } else {
        (event.target as HTMLElement).focus();
      }
    }
    super.handleFocus(event);
  }

  /**
   * Helper function to get the first focusable child element
   */
  protected get hasPersistedFocus() {
    return this.service.hasPersistedFocus(this.host, this.config);
  }

  /**
   * Helper function to indicate whether we should use autofocus for the
   * child elements.
   */
  protected get shouldAutofocus(): boolean {
    return !!this.config?.autofocus;
  }

  /**
   * Helper function to get the first focusable child element.
   *
   * We keep this private to not pollute the API.
   */
  private get firstFocusable(): HTMLElement {
    return this.service.findFirstFocusable(this.host, this.config);
  }
}
