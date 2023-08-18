import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutingService, TranslationService } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { CdpOrderHistoryService } from './cdp-order-history.service';

@Component({
  selector: 'cx-cdp-order-history',
  templateUrl: './cdp-order-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdpOrderHistoryComponent {
  /*
   * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
   *
   * SPDX-License-Identifier: Apache-2.0
   */
  orders$: Observable<OrderHistoryList | undefined>;
  constructor(
    protected routing: RoutingService,
    protected cdpOrderHistoryService: CdpOrderHistoryService,
    protected translation: TranslationService
  ) {
    this.orders$ = this.cdpOrderHistoryService.getOrderHistoryList(5);
    this.orders$.subscribe((res) => {
      console.log('in component: ', res);
    });
  }
}
