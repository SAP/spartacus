/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, inject } from '@angular/core';
import { BulkPricingService } from '@spartacus/product/bulk-pricing/core';
import { RoutingService } from '@spartacus/core';
import { BulkPrice } from '@spartacus/product/bulk-pricing/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-bulk-pricing-table',
  templateUrl: './bulk-pricing-table.component.html',
  standalone: false,
})
export class BulkPricingTableComponent implements OnInit {
  protected routingService = inject(RoutingService);
  protected bulkPricingService = inject(BulkPricingService);

  protected readonly PRODUCT_KEY = 'productCode';

  priceTiers$: Observable<BulkPrice[] | undefined>;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit() {
    this.priceTiers$ = this.getPrices();
  }

  formatQuantity(tier: BulkPrice): string {
    let formattedQuantityRange = '';
    if (!tier.maxQuantity) {
      formattedQuantityRange = tier.minQuantity + '+';
    } else {
      formattedQuantityRange = tier.minQuantity + ' - ' + tier.maxQuantity;
    }
    return formattedQuantityRange;
  }

  getPrices(): Observable<BulkPrice[] | undefined> {
    return this.routingService.getRouterState().pipe(
      switchMap((state) => {
        const productCode = state.state.params[this.PRODUCT_KEY];
        return this.bulkPricingService.getBulkPrices(productCode);
      })
    );
  }
}
