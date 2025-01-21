/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, ElementRef, isDevMode } from '@angular/core';
import { LoggerService } from '@spartacus/core';

/**
 * Directive to enhance carousel item accessibility by ensuring they can receive focus,
 * enabling keyboard navigation using Arrow keys between carousel items.
 *
 * Upon initialization, the directive verifies if the host element is inherently focusable
 * or if it has an appropriately set tabindex. If an element cannot receive focus and the
 * application is running in development mode, a warning is logged to help identify and
 * correct accessibility issues during development.
 *
 * Usage example:
 * ```
 * <ng-container>
 *   <cx-carousel [template]="thumb">
 *     ...
 *   </cx-carousel>
 * </ng-container>
 *
 * <ng-template #thumb let-item="item">
 *   <cx-media cxFocusableCarouselItem tabindex="0">
 *     ...
 *   </cx-media>
 * </ng-template>
 * ```
 */
@Directive({
  selector: '[cxFocusableCarouselItem]',
})
export class FocusableCarouselItemDirective {
  constructor(
    protected logger: LoggerService,
    protected el: ElementRef
  ) {
    if (isDevMode() && !this.canElementReceiveFocus()) {
      this.logger.warn(
        `cxFocusableCarouselItem: Element cannot receive focus: ${this.el.nativeElement.tagName}. Either use one of the focusable elements, or add a non-negative tabindex.`
      );
    }
  }

  protected canElementReceiveFocus(): boolean {
    const focusableTags = ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON', 'A'];
    const element = this.el.nativeElement;
    const hasTabIndex =
      element.hasAttribute('tabindex') &&
      element.getAttribute('tabindex') !== '-1';
    const isFocusableTag = focusableTags.includes(element.tagName);
    const isDisabled = element.hasAttribute('disabled');

    return (hasTabIndex || isFocusableTag) && !isDisabled;
  }
}
