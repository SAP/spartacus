/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import { useFeatureStyles } from '@spartacus/core';
import { FutureStockFacade } from '@spartacus/product/future-stock/root';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-future-stock-accordion',
  templateUrl: './future-stock-accordion.component.html',
  standalone: false,
})
export class FutureStockAccordionComponent {
  protected futureStockService = inject(FutureStockFacade);

  futureStocks$ = this.futureStockService.getFutureStock();
  expanded: boolean = false;
  iconType = ICON_TYPE;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    useFeatureStyles('a11yCroppedFocusRing');
    useFeatureStyles('a11yUseProperTextColorForFutureStockAccordion');
  }

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
