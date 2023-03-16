/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[cxTab]',
})
export class TabDirective {
  @HostBinding('attr.aria-selected')
  ariaSelected: boolean;

  @HostBinding('attr.tabindex')
  tabindex: 0 | -1;

  constructor(protected elementRef: ElementRef<HTMLElement>) {}

  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}
