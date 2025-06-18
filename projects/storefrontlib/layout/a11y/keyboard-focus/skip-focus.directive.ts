/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';

export interface SkipFocusConfig {
  isEnabled: boolean;
  /**
   * elements selectors that should not be skipped
   * for ex `activeElementSelectors: ['button.cx-hamburger']`
   */
  activeElementSelectors?: string[];
}
/**
 * Directive that removes all visible and focusable elements
 * in a host container from `tab` or `shift-tab` navigation
 * except elements in `activeElementSelectors` config.
 */
@Directive({
  selector: '[cxSkipFocus]',
  standalone: false,
})
export class SkipFocusDirective implements OnChanges {
  @Input('cxSkipFocus') config: SkipFocusConfig = { isEnabled: false };

  protected elementRef = inject(ElementRef);
  protected winRef = inject(WindowRef);
  protected renderer = inject(Renderer2);

  public ngOnChanges(): void {
    this.excludeFromFocus(
      this.config.isEnabled,
      this.config.activeElementSelectors
    );
  }

  protected excludeFromFocus(
    isEnabled: boolean,
    skipSelectors: string[] = []
  ): void {
    if (!this.winRef.isBrowser()) {
      return;
    }
    const tabindex = isEnabled ? '-1' : '0';
    const focusableElementsSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]';
    const focusableElements = this.elementRef.nativeElement.querySelectorAll(
      focusableElementsSelector
    );
    Array.from(focusableElements || []).forEach((el) => {
      const element = el as HTMLElement;
      const shouldSkip = skipSelectors.some((selector) => {
        return element.matches(selector);
      });
      if (!shouldSkip && this.isElementVisible(element)) {
        this.renderer.setAttribute(element, 'tabindex', tabindex);
      }
    });
  }

  protected isElementVisible(element: HTMLElement): boolean {
    const style = this.winRef.nativeWindow?.getComputedStyle(element);
    return (
      style?.visibility !== 'hidden' &&
      style?.display !== 'none' &&
      element.offsetWidth > 0 &&
      element.offsetHeight > 0
    );
  }
}
