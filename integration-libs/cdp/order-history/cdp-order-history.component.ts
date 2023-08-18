import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoutingService, TranslationService } from '@spartacus/core';
import { OrderHistoryComponent } from '@spartacus/order/components';
import {
  OrderHistoryFacade,
  ReplenishmentOrderHistoryFacade,
} from '@spartacus/order/root';

@Component({
  selector: 'cx-cdp-order-history',
  templateUrl: './cdp-order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdpOrderHistoryComponent extends OrderHistoryComponent {
  /*
   * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
   *
   * SPDX-License-Identifier: Apache-2.0
   */
  constructor(
    protected routing: RoutingService,
    protected orderHistoryFacade: OrderHistoryFacade,
    protected translation: TranslationService,
    protected replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade
  ) {
    super(
      routing,
      orderHistoryFacade,
      translation,
      replenishmentOrderHistoryFacade
    );
    this.orders$.subscribe((result) => {
      console.log(result);
    });
  }
}
