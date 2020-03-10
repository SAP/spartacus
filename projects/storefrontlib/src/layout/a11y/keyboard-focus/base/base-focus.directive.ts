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
 * - Persist Focus
 * - Auto Focus
 * - Escape Focus
 * - Tab Focus
 * - Lock Focus
 * - Trap Focus
 */
@Directive()
export abstract class BaseFocusDirective implements OnInit {
  protected config: BaseFocusConfig;
  protected defaultConfig: BaseFocusConfig = {};

  /**
   * The host tabindex will default to -1 for elements that require
   * an explicit tabindex if we set the focus.
   */
  // tslint:disable-next-line: no-input-rename
  @Input('tabindex') currentIndex = '-1';

  // the tabindex attribute we like to replace
  @HostBinding('attr.tabindex') protected tabindex: number;

  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    protected service: BaseFocusService
  ) {}

  ngOnInit() {
    this.setDefaultConfiguration();
    this.forceTabindex();
  }

  protected setDefaultConfiguration(): void {
    if ((!this.config || this.config === '') && this.defaultConfig) {
      this.config = this.defaultConfig;
    }
  }

  /**
   * forces a tabindex on the host element if it's lacking or
   * not forced by the semantic nature of the host element. Buttons,
   * active links, etc. do no need an explicit tabindex to receive focus.
   */
  protected forceTabindex() {
    if (this.requiresExplicitTabIndex) {
      this.tabindex = Number(this.currentIndex);
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
   * returns true if the host element does not have a tabindex defined
   * and it also doesn't get focus by browsers nature (i.e. button or
   * active link).
   */
  protected get requiresExplicitTabIndex(): boolean {
    return (
      this.currentIndex !== undefined &&
      ['button', 'input', 'select', 'textarea'].indexOf(
        this.host.tagName.toLowerCase()
      ) === -1 &&
      !(this.host.tagName === 'A' && this.host.hasAttribute('href'))
    );
  }
}
