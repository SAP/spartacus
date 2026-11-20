/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, OnDestroy, OnInit, inject, input } from '@angular/core';
import { WindowRef } from '@spartacus/core';

@Directive({
  selector: '[cxConfiguratorMainAriaLabelledBy]',
  standalone: true,
})
export class ConfiguratorMainAriaLabelledByDirective
  implements OnInit, OnDestroy
{
  readonly labelledbyId = input<string>(undefined, {
    alias: 'cxConfiguratorMainAriaLabelledBy',
  });

  protected winRef = inject(WindowRef);

  protected mainEl: HTMLElement | null = null;

  ngOnInit() {
    this.mainEl = this.winRef.document.querySelector('main');
    const labelledbyId = this.labelledbyId();
    if (this.mainEl && labelledbyId) {
      this.mainEl.setAttribute('aria-labelledby', labelledbyId);
    }
  }

  ngOnDestroy() {
    if (this.mainEl) {
      this.mainEl.removeAttribute('aria-labelledby');
    }
  }
}
