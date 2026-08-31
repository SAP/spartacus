/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Focuses the first invalid form control within the host element.
 *
 * Meant to run after a failed submit, once the controls have been marked as
 * touched (so the `ng-invalid` class is present). Unlike the data-driven
 * autofocus (`cxFocus`), which always targets the first focusable field, a
 * failed submit must land on the *specific* invalid one — hence the direct DOM
 * query.
 *
 * This is useful when the host is wrapped in a `cxFocus` autofocus host with
 * `tabindex="-1"`: in Safari a `<button>` doesn't receive focus on click, so
 * focus falls to that host and its autofocus redirects to the first focusable
 * field, regardless of which field is actually invalid. Deferring to a
 * macrotask lets this run after that autofocus and land the user on the real
 * error.
 *
 * @example
 * ```html
 * <form cxFocusFirstInvalidField>...</form>
 * ```
 */
@Directive({
  selector: '[cxFocusFirstInvalidField]',
  standalone: true,
})
export class FocusFirstInvalidFieldDirective {
  protected elementRef = inject(ElementRef);

  focusFirstInvalidField(): void {
    setTimeout(() => {
      const host = this.elementRef.nativeElement as HTMLElement;
      const firstInvalid = host.querySelector<HTMLElement>(
        'input.ng-invalid, select.ng-invalid, textarea.ng-invalid, ng-select.ng-invalid'
      );
      if (!firstInvalid) {
        return;
      }
      // `ng-select` isn't focusable itself; focus its inner input. Plain
      // inputs/selects/textareas have no nested input, so we focus them directly.
      const focusable =
        firstInvalid.querySelector<HTMLElement>('input') ?? firstInvalid;
      focusable.focus();
    });
  }
}
