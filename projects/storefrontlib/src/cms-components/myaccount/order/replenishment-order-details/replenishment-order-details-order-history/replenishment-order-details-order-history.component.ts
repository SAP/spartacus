import { Component } from '@angular/core';
import {
  RoutingService,
  TranslationService,
  UserOrderService,
} from '@spartacus/core';
import { OrderHistoryComponent } from '../../order-history/order-history.component';

@Component({
  selector: 'cx-replenishment-order-details-order-history',
  templateUrl: './replenishment-order-details-order-history.component.html',
})
export class ReplenishmentOrderDetailsOrderHistoryComponent extends OrderHistoryComponent {
  constructor(
    protected routing: RoutingService,
    protected userOrderService: UserOrderService,
    protected translation: TranslationService
  ) {
    super(routing, userOrderService, translation);
  }
}
