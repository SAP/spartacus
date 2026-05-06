/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AfterViewInit, Directive, ElementRef } from '@angular/core';

/**
 * Programmatically focuses the host element once after it is initialized.
 * Intended for accessibility: ensures screen readers announce a specific
 * element (e.g. a page heading) when navigating to a view, rather than
 * defaulting to the first interactive control.
 *
 * Sets `tabindex="-1"` on the host so the element is focusable
 * programmatically but not reachable via keyboard Tab. This can be
 * overridden in the template (e.g. `tabindex="0"`) if needed.
 *
 * Uses `setTimeout` to defer focus to the next event loop tick,
 * ensuring sibling components (e.g. ng-select) finish initializing
 * before focus is applied.
 *
 * Usage:
 *   `<h2 cxFocusOnInit>Page Title</h2>`
 */
@Directive({ selector: '[cxFocusOnInit]', host: { tabindex: '-1' } })
export class FocusOnInitDirective implements AfterViewInit {
  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.el.nativeElement.focus());
  }
}
