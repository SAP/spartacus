/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[cxConfiguratorMainAriaLabelledBy]',
  standalone: true,
})
export class ConfiguratorMainAriaLabelledByDirective
  implements OnInit, OnDestroy
{
  @Input('cxConfiguratorMainAriaLabelledBy') labelledbyId: string;

  private mainEl: HTMLElement | null = null;

  ngOnInit() {
    this.mainEl = document.querySelector('main');
    if (this.mainEl && this.labelledbyId) {
      this.mainEl.setAttribute('aria-labelledby', this.labelledbyId);
    }
  }

  ngOnDestroy() {
    if (this.mainEl) {
      this.mainEl.removeAttribute('aria-labelledby');
    }
  }
}
