import { Component, OnInit } from '@angular/core';
import { EventService } from '@spartacus/core';
import {
  OrderDetailActionsComponent,
  OrderDetailsService,
} from '../../../components/order-details';
import { Order } from '../../../root/model';

import { DownloadOrderInvoicesEvent } from '../../../root/events';

@Component({
  selector: 'cx-order-details-enhanced-ui-actions',
  templateUrl: './order-details-enhanced-ui-actions.component.html',
})
export class OrderDetailsEnhancedUIActionsComponent
  extends OrderDetailActionsComponent
  implements OnInit
{
  order: Order;
  constructor(
    protected eventService: EventService,
    protected orderDetailsService: OrderDetailsService
  ) {
    super(orderDetailsService);
  }
  ngOnInit(): void {
    this.order$.subscribe((order) => {
      this.order = order;
    });
  }
  showDialog(order: Order) {
    const newEvent = new DownloadOrderInvoicesEvent();
    newEvent.order = order;
    this.eventService.dispatch(newEvent);
  }
}
