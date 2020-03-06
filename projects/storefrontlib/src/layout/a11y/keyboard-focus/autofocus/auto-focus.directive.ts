import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
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
  implements OnInit, AfterViewInit {
  /** configuration options to steer the usage. defaults to true.  */
  @Input('cxAutoFocus') protected config: AutoFocusConfig;

  constructor(
    protected elementRef: ElementRef,
    protected autoFocusService: AutoFocusService
  ) {
    super(elementRef, autoFocusService);
  }

  ngOnInit() {
    if (!this.config || this.config === '') {
      this.config = { autofocus: true };
    }

    super.ngOnInit();
  }
  /**
   * Focus the element explicitely if it was focussed before.
   */
  ngAfterViewInit(): void {
    // new...
    // console.log(
    //   'ngAfterViewInit',
    //   this.host,
    //   this.host.getAttribute('tabindex')
    // );
    if (this.isAutofocus) {
      this.host.focus();
      // if (this.host.getAttribute('tabindex') === undefined) {
      //   console.log('autofocus set to -1???');
      //   // this.tabIndex = -1;
      // }
    }

    if (this.hasPersistedFocus || !this.isAutofocus) {
      super.ngAfterViewInit();
    }
  }

  /**
   * Handles the autofocus of the nested focusable element.
   */
  protected handleFocus(event: KeyboardEvent) {
    // console.log('auto focus', this.host);
    if (this.isAutofocus) {
      this.firstFocusable?.focus();
    }
    super.handleFocus(event);
  }

  protected get firstFocusable(): HTMLElement {
    return this.autoFocusService.findfirstFocusable(this.host, this.config);
  }

  protected get hasPersistedFocus() {
    return this.autoFocusService.hasPersistedFocus(this.host, this.config);
  }

  // protected get group() {
  //   return this.persistService.getPersistenceGroup(this.host, this.config);
  // }

  protected get isAutofocus(): boolean {
    return !!this.config?.autofocus;
  }
}
