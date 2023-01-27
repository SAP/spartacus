/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FutureStock } from '@spartacus/core';
import { FutureStockFacade } from '@spartacus/product/future-stock/root';
import { Subscription } from 'rxjs';

export const NO_FUTURE_STOCK =
  'This product has no future availability information.';

@Component({
  selector: 'cx-future-stock-container',
  templateUrl: './future-stock-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FutureStockContainerComponent implements OnInit, OnDestroy {
  futureStocks$ = this.futureStockService.getFutureStock();
  futureStocks: FutureStock[] | string;

  futureStockSubscription: Subscription;

  constructor(protected futureStockService: FutureStockFacade) {}

  ngOnInit() {
    if (!this.futureStocks) {
      this.futureStockSubscription = this.futureStocks$.subscribe(
        (futureStocks) => {
          this.futureStocks =
            futureStocks && futureStocks.futureStocks.length !== 0
              ? futureStocks.futureStocks
              : NO_FUTURE_STOCK;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.futureStockSubscription.unsubscribe();
  }
}
