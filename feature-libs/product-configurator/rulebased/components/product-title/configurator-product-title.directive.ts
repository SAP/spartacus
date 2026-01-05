/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { WindowRef } from '@spartacus/core';

@Directive({
  selector: '[cxConfiguratorMainAriaLabelledBy]',
  standalone: true,
})
export class ConfiguratorMainAriaLabelledByDirective
  implements OnInit, OnDestroy
{
  @Input('cxConfiguratorMainAriaLabelledBy') labelledbyId: string;

  protected winRef = inject(WindowRef);

  protected mainEl: HTMLElement | null = null;

  ngOnInit() {
    this.mainEl = this.winRef.document.querySelector('main');
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
