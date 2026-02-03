/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FeatureDirective, TranslatePipe } from '@spartacus/core';
import { FutureStockFacade } from '@spartacus/product/future-stock/root';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-future-stock-accordion',
  templateUrl: './future-stock-accordion.component.html',
  imports: [
    NgIf,
    IconComponent,
    NgFor,
    AsyncPipe,
    TranslatePipe,
    FeatureDirective,
  ],
})
export class FutureStockAccordionComponent {
  futureStocks$ = this.futureStockService.getFutureStock();
  expanded: boolean = false;
  iconType = ICON_TYPE;

  constructor(protected futureStockService: FutureStockFacade) {}

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
