import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { BaseFocusConfig } from '../keyboard-focus.model';
import { BaseFocusService } from './base-focus.service';

/**
 * Abstract directive that provides a common interface for all focus directives:
 * - Block Focus
 * - Persist Focus
 * - Escape Focus
 * - Auto Focus
 * - Tab Focus
 * - Trap Focus
 * - Lock Focus
 */
@Directive()
export abstract class BaseFocusDirective implements OnInit {
  /**
   * Optional configuration for the focus directive drives the behaviour of the keyboard
   * focus directive.
   */
  protected config: BaseFocusConfig;

  /**
   * A default config can be provided for each directive if a specific focus directive
   * is used directly. i.e. `<div cxAutoFocus></div>`
   */
  protected defaultConfig: BaseFocusConfig = {};

  @Input() @HostBinding('attr.tabindex') tabindex: number;

  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    protected service: BaseFocusService
  ) {}

  ngOnInit() {
    this.setDefaultConfiguration();
    this.requiredTabindex = -1;
  }

  /**
   * Override the (input) config if it undefined or an empty string, with the
   * `defaultConfig`. The `defaultConfig` might be specified for each directive
   * differently. If a specific directive is used (i.e. `cxAutoFocus`), the
   * specific (inherited) defaultConfig will be used.
   */
  protected setDefaultConfiguration(): void {
    if ((!this.config || this.config === '') && this.defaultConfig) {
      this.config = this.defaultConfig;
    }
  }

  /**
   * Helper method to return the host element for the directive
   * given by the `elementRef`.
   */
  protected get host(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  /**
   * Force a tabindex on the host element if it is _requried_ to make the element
   * focusable. If the element is focusable by nature or by a given tabindex, the
   * `tabindex` is not applied.
   *
   * Buttons, active links, etc. do no need an explicit tabindex to receive focus.
   */
  protected set requiredTabindex(tabindex: number) {
    if (this.requiresExplicitTabIndex) {
      this.tabindex = tabindex;
    }
  }

  /**
   * Returns true if the host element does not have a tabindex defined
   * and it also doesn't get focus by browsers nature (i.e. button or
   * active link).
   *
   * We keep this utility method private to not pollute the API.
   */
  private get requiresExplicitTabIndex(): boolean {
    return (
      this.tabindex === undefined &&
      ['button', 'input', 'select', 'textarea'].indexOf(
        this.host.tagName.toLowerCase()
      ) === -1 &&
      !(this.host.tagName === 'A' && this.host.hasAttribute('href'))
    );
  }
}
