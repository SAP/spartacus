/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { B2BUnit, RoutingService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class AccountSummaryItemService {
  protected routingService = inject(RoutingService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  launchDetails(item: B2BUnit): void {
    if (item && Object.keys(item).length > 0) {
      this.routingService.go({
        cxRoute: 'orgAccountSummaryDetails',
        params: item,
      });
    }
  }
}
