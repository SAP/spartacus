import { Component, OnInit } from '@angular/core';
import { OrderDetailActionsComponent } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';

@Component({
  selector: 'cx-s4-service-order-detail-actions',
  templateUrl: './s4-service-order-detail-actions.component.html'
})
export class S4ServiceOrderDetailActionsComponent extends OrderDetailActionsComponent implements OnInit {
  order: Order;

  ngOnInit(): void {
    this.order$.subscribe((order) => {
      this.order = order;
      console.log('Order details: ', order);
    });
  }
}
